class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar('life');
  throwableObjects = [];
  maxCoins = 40;
  poisonBar = new StatusBar('poison');
  coinBar = new StatusBar('coin');
  lastBubbleThrow = 0;
  bubbleCooldown = 600;
  gameOver = false;
  gameInterval;
  animationFrameId;
  restartTimeout;


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
    this.enemies.forEach(enemy => enemy.world = this);
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

  removeBubblesOutsideCanvas() {
    this.throwableObjects = this.throwableObjects.filter((bubble) => {
      let screenX = bubble.x + this.camera_x;
  
      return screenX > -bubble.width && screenX < this.canvas.width;
    });
  }

  run() {
    this.gameInterval = setInterval(() => {
      this.checkCollisions();
      this.checkCollectPoison();
      this.checkCollectCoins();
      this.checkThrowObjects();
      this.checkBubbleCollisions();
      this.removeBubblesOutsideCanvas();
      this.checkFinSlapAttack();
      this.checkEndbossAttack();
    }, 100);
  }

  checkThrowObjects() {
    if (this.gameOver) {
      return;
    }
  
    if (this.keyboard.D && this.canThrowBubble() && !this.character.isBubbleAttacking) {
      this.character.startBubbleAttack();
      this.lastBubbleThrow = Date.now();
    }
  }

  createBubbleFromSharkieMouth() {
    let mouth = this.getSharkieMouthPosition();
  
    let isPoisonBubble =
      this.isInEndbossBubbleRange() &&
      this.character.collectedPoison > 0;
  
    let bubble = new ThrowableObject(
      mouth.x,
      mouth.y,
      this.character.otherDirection,
      isPoisonBubble
    );
  
    if (isPoisonBubble) {
      this.character.collectedPoison--;
  
      this.poisonBar.setPercentage(
        this.character.collectedPoison * 20
      );
    }
  
    this.throwableObjects.push(bubble);
  }

  getEndboss() {
    return this.enemies.find(enemy => enemy instanceof Endboss);
  }
  
  isInEndbossBubbleRange() {
    let endboss = this.getEndboss();
  
    if (!endboss || endboss.isDead()) {
      return false;
    }
  
    return Math.abs(this.character.x - endboss.x) < 800;
  }
  
  isInEndbossAttackRange() {
    let endboss = this.getEndboss();
  
    if (!endboss || endboss.isDead()) {
      return false;
    }
  
    return Math.abs(this.character.x - endboss.x) < 350;
  }
  
  hasActivePoisonBubble() {
    return this.throwableObjects.some(bubble => bubble.isPoisonBubble);
  }
  
  hasNoChanceToBeatEndboss() {
    let endboss = this.getEndboss();
  
    return (
      endboss &&
      !endboss.isDead() &&
      this.character.collectedPoison <= 0 &&
      !this.hasActivePoisonBubble()
    );
  }

  countActivePoisonBubbles() {
    return this.throwableObjects.filter(bubble => bubble.isPoisonBubble).length;
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

  checkFinSlapAttack() {
    if (this.keyboard.SPACE && !this.character.isFinSlap) {
      this.character.startFinSlap();
      this.hitPufferFishWithFinSlap();
    }
  }

  hitPufferFishWithFinSlap() {
    this.enemies.forEach((enemy) => {
      if (enemy instanceof PufferFish && !enemy.isDeadPuffer) {
        if (this.character.isColliding(enemy)) {
          enemy.dieByFinSlap();
        }
      }
    });
  }

  checkBubbleCollisions() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.enemies.forEach((enemy) => {
        if (!bubble.isColliding(enemy)) {
          return;
        }
  
        if (enemy instanceof JellyFish && !enemy.isDeadJelly) {
          enemy.dieInBubble();
          this.throwableObjects.splice(bubbleIndex, 1);
          return;
        }
  
        if (enemy instanceof Endboss && !enemy.isDead() && bubble.isPoisonBubble) {
          enemy.hit("poison");
          this.throwableObjects.splice(bubbleIndex, 1);
        
          if (enemy.isDead()) {
            this.triggerYouWin();
            return;
          }
        
          this.checkEndbossFightLost();
        }
      });
    });
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss && enemy.isDead()) {
        return;
      }
  
      if (enemy instanceof JellyFish && enemy.isDeadJelly) {
        return;
      }

      if (enemy instanceof PufferFish && enemy.isDeadPuffer) {
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
      
        if (this.character.isDead()) {
          this.triggerGameOver();
        }
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
  
        this.coinBar.setPercentage(
          this.character.collectedCoins * (100 / this.maxCoins)
        );
  
        return false;
      }
      return true;
    });
  }

  isNearEndboss() {
    let endboss = this.enemies.find(enemy => enemy instanceof Endboss);
  
    if (!endboss || endboss.isDead()) {
      return false;
    }
  
    return Math.abs(this.character.x - endboss.x) < 350;
  }

  

  checkEndbossAttack() {
    let endboss = this.getEndboss();
  
    if (!endboss || endboss.isDead() || this.gameOver) {
      return;
    }
  
    if (this.isInEndbossAttackRange()) {
      endboss.startAttack();
    }
  }

  checkEndbossFightLost() {
    if (this.hasNoChanceToBeatEndboss()) {
      this.triggerGameOver();
    }
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
  
    this.animationFrameId = requestAnimationFrame(() => this.draw());
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

  triggerGameOver() {
    if (this.gameOver) {
      return;
    }
  
    this.gameOver = true;
    this.character.die();
    this.statusBar.setPercentage(0);
  
    let gameOverScreen = document.getElementById("game-over-screen");
  
    if (gameOverScreen) {
      gameOverScreen.style.display = "flex";
    }
  }

  triggerYouWin() {
    if (this.gameOver) {
      return;
    }
  
    this.gameOver = true;
  
    let youWinScreen = document.getElementById("you-win-screen");
  
    if (youWinScreen) {
      youWinScreen.style.display = "flex";
    }
  
    this.restartTimeout = setTimeout(() => {
      showStartScreen();
    }, 6000);
  }

  stop() {
    clearInterval(this.gameInterval);
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.restartTimeout);
  }

}