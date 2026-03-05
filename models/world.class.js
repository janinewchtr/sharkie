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

    this.enemies = [new PufferFish(), new PufferFish(), new PufferFish()];

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
  }

  setWorld() {
    this.character.world = this;
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
      this.ctx.save();
      this.ctx.translate(mo.x + mo.width / 2, 0); // Move the context to the center of the object
      this.ctx.scale(-1, 1); // Flip the context horizontally
      this.ctx.translate(-mo.x - mo.width / 2, 0); // Move the context back to its original position
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if(mo.otherDirection) {
      this.ctx.restore(); // Restore the context to its original state
    }
  }
}
