class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  character;
  enemies;
  backgroundObjects;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.character = new Character();

    this.enemies = [
        new PufferFish(), 
        new PufferFish(), 
        new PufferFish(),
        new JellyFish(),
        new JellyFish(),
        new Poison(),
        new Endboss(),
    ];

    let backgroundLayerImages = [
        "img/3. Background/Layers/5. Water/D.png",
        "img/3. Background/Layers/4.Fondo 2/D.png",
        "img/3. Background/Layers/3.Fondo 1/D.png",
        "img/3. Background/Legacy/Layers/1. Light/3.png",
        "img/3. Background/Layers/2. Floor/D.png"
      ];
      
      this.backgroundObjects = [];
      
      for (let layerIndex = 0; layerIndex < 5; layerIndex++) {          // Anzahl der Background-Segmente
        for (let bliIndex = 0; bliIndex < backgroundLayerImages.length; bliIndex++) {
          this.backgroundObjects.push(
            new BackgroundObject(backgroundLayerImages[bliIndex], layerIndex  * 920)
          );
        }
      }

    this.setWorld();
    this.character.start();
    this.draw();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (enemy instanceof Poison) {
            this.character.hit("poison");
          } else if (enemy instanceof JellyFish) {
            this.character.hit("electro");
          } else if (enemy instanceof PufferFish) {
            this.character.hit("poison"); // oder "normal", wenn du später extra Animationen willst
          } else if (enemy instanceof Endboss) {
            this.character.hit("electro"); // oder eigener Typ, je nach gewünschtem Verhalten
          }
  
          console.log("Collision with", enemy.constructor.name, "energy:", this.character.energy);
        }
      });
    }, 100);
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // Move the entire world to the left by camera_x

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0); // Move the world back to its original position

    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  addToMap(mo) {
    if(mo.otherDirection) {
        this.flipImage(mo);
    }
    
    mo.draw(this.ctx); // Call the draw method of the movable object to render it on the canvas

    mo.drawFrame(this.ctx); // Call the drawFrame method of the movable object to render its bounding box (for debugging purposes)  

    if(mo.otherDirection) {
        this.ctx.restore();
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width / 2, 0); // Move the context to the center of the object
    this.ctx.scale(-1, 1); // Flip the context horizontally
    this.ctx.translate(-mo.x - mo.width / 2, 0); // Move the context back to its original position

  }

}