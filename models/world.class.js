class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];


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
      
      const segmentWidth = 920;
      const numberOfSegments = 5;
    
      this.backgroundObjects = [];
    
      for (let segmentIndex = 0; segmentIndex < numberOfSegments; segmentIndex++) {
        for (let imageIndex = 0; imageIndex < backgroundLayerImages.length; imageIndex++) {
          this.backgroundObjects.push(
            new BackgroundObject(
              backgroundLayerImages[imageIndex],
              segmentIndex * segmentWidth
            )
          );
        }
      }
    
      this.levelWidth = numberOfSegments * segmentWidth;

    this.setWorld();
    this.character.start();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  updateCamera() {
    this.camera_x = -this.character.x + 100;
  
    const minCameraX = -(this.levelWidth - this.canvas.width);
    const maxCameraX = 0;
  
    if (this.camera_x < minCameraX) {
      this.camera_x = minCameraX;
    }
  
    if (this.camera_x > maxCameraX) {
      this.camera_x = maxCameraX;
    }
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.d) {
      let throwableObject = new ThrowableObject(this.character.x + 100, this.character.y + 50, this.character.otherDirection);
      this.throwableObjects.push(throwableObject);
    }
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof JellyFish) {
          this.character.hit("electro");
        } else if (enemy instanceof PufferFish) {
          this.character.hit("poison"); // oder "normal", wenn du später extra Animationen willst
        } else if (enemy instanceof Endboss) {
          this.character.hit("electro"); // oder eigener Typ, je nach gewünschtem Verhalten
        } this.statusBar.reducePercentage(this.character.energy);
      }
    });
  }

  draw() {
    this.updateCamera();
  
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.ctx.translate(this.camera_x, 0);
  
    this.addObjectsToMap(this.backgroundObjects);
  
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
  
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.throwableObjects);
  
    this.ctx.translate(-this.camera_x, 0);
  
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