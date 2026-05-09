class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar('life');
  throwableObjects = [];
  poisonBar = new StatusBar('poison');
  coinBar = new StatusBar('coin');
  lastBubbleThrow = 0;
  bubbleCooldown = 600;


  character;
  enemies;
  backgroundObjects;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.poisonBar.y = 30;
    this.poisonBar.setPercentage(0);

    this.coinBar.y = 60;
    this.coinBar.setPercentage(0);

    this.character = new Character();

    this.enemies = [];
    this.poisonBottles = [];
    this.coins = [];

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

      this.createEnemies();
      this.createPoisonBottles();
      this.createCoins();


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

  createCoinArc(startX, startY, amount, spacing, height) {
    for (let i = 0; i < amount; i++) {
      let x = startX + i * spacing;
  
      // Parabel für Bogenform
      let y = startY - Math.sin((i / (amount - 1)) * Math.PI) * height;
  
      this.coins.push(new Coin(x, y));
    }
  }

  createEnemies() {
    this.enemies = [
      new PufferFish(700, 250),
      new PufferFish(1300, 200),
      new PufferFish(1900, 300),
      new PufferFish(2600, 220),
  
      new JellyFish(1000, 80),
      new JellyFish(2100, 120),
      new JellyFish(3200, 100),
    ];
  
    let endboss = new Endboss();
    endboss.x = this.levelWidth - 500;
    endboss.y = -200;
    this.enemies.push(endboss);
  }
  
  createPoisonBottles() {
    this.poisonBottles = [
      new Poison(600, 250),
      new Poison(1500, 180),
      new Poison(2300, 280),
      new Poison(3100, 150),
      new Poison(3700, 220),
    ];
  }

  createCoins() {
    this.coins = [];
    this.createCoinArc(400, 300, 7, 60, 120);
    this.createCoinArc(1400, 280, 6, 60, 100);
    this.createCoinArc(2400, 260, 8, 60, 140);
    this.createCoinArc(3300, 300, 5, 60, 80);
  }
  
  getRandomX(min, max) {
    return min + Math.random() * (max - min);
  }
  
  getRandomY(min, max) {
    return min + Math.random() * (max - min);
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollectPoison();
      this.checkCollectCoins();
      this.checkThrowObjects();
      this.checkBubbleCollisions();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.canThrowBubble()) {
      let mouth = this.getSharkieMouthPosition();
  
      let bubble = new ThrowableObject(
        mouth.x,
        mouth.y,
        this.character.otherDirection
      );
  
      this.throwableObjects.push(bubble);
      this.lastBubbleThrow = Date.now();
    }
  }
  
  canThrowBubble() {
    return Date.now() - this.lastBubbleThrow > this.bubbleCooldown;
  }
  
  getSharkieMouthPosition() {
    if (this.character.otherDirection) {
      return {
        x: this.character.x + 30,
        y: this.character.y + 115,
      };
    }
  
    return {
      x: this.character.x + this.character.width - 40,
      y: this.character.y + 115,
    };
  }
  
  checkBubbleCollisions() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy)) {
          if (enemy instanceof JellyFish && !enemy.isDeadJelly) {
            enemy.dieInBubble();
            this.throwableObjects.splice(bubbleIndex, 1);
          }
  
          if (enemy instanceof Endboss) {
            enemy.hit("bubble");
            this.throwableObjects.splice(bubbleIndex, 1);
          }
        }
      });
    });
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (enemy instanceof JellyFish && enemy.isDeadJelly) {
        return;
      }
  
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof JellyFish) {
          this.character.hit("electro");
        } else if (enemy instanceof PufferFish) {
          this.character.hit("poison");
        } else if (enemy instanceof Endboss) {
          this.character.hit("electro");
        }
  
        this.statusBar.reducePercentage(this.character.energy);
      }
    });
  }

  checkCollectPoison() {
    this.poisonBottles = this.poisonBottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
  
        this.character.collectPoison();
  
        // Statusbar aktualisieren
        this.poisonBar.setPercentage(this.character.collectedPoison * 20);
  
        return false;
      }
      return true;
    });
  }

  checkCollectCoins() {
    this.coins = this.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
  
        this.character.collectCoins();
  
        // Statusbar aktualisieren
        this.coinBar.setPercentage(this.character.collectedCoins * 20);
  
        return false;
      }
      return true;
    });
  }

  draw() {
    this.updateCamera();
  
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.ctx.translate(this.camera_x, 0);
  
    this.addObjectsToMap(this.backgroundObjects);
  
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);
  
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.poisonBottles);
    this.addObjectsToMap(this.coins);
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