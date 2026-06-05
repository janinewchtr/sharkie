class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar("life");
  poisonBar = new StatusBar("poison");
  coinBar = new StatusBar("coin");
  throwableObjects = [];
  lastBubbleThrow = 0;
  bubbleCooldown = 600;
  gameOver = false;
  animationFrameId;
  restartTimeout;
  maxCoins = 0;

  character;
  enemies;
  backgroundObjects;
  poisonBottles;
  coins;
  levelWidth;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.initBars();
    this.initLevel();
    this.setWorld();

    this.character.start();
    this.draw();
    this.run();
  }

  initBars() {
    this.poisonBar.y = 30;
    this.poisonBar.setPercentage(0);

    this.coinBar.y = 60;
    this.coinBar.setPercentage(0);
  }

  initLevel() {
    this.character = new Character();
    this.levelWidth = getLevelWidth();
    this.backgroundObjects = createLevelBackgroundObjects();
    this.enemies = createLevelEnemies(this.levelWidth);
    this.poisonBottles = createLevelPoisonBottles();
    this.coins = createLevelCoins();
    this.maxCoins = this.coins.length;
  }

  setWorld() {
    this.character.world = this;
    this.enemies.forEach((enemy) => enemy.world = this);
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
    setStoppableInterval(() => {
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

  removeBubblesOutsideCanvas() {
    this.throwableObjects = this.throwableObjects.filter((bubble) => {
      let screenX = bubble.x + this.camera_x;
      return screenX > -bubble.width && screenX < this.canvas.width;
    });
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

  canThrowBubble() {
    return Date.now() - this.lastBubbleThrow > this.bubbleCooldown;
  }

  createBubbleFromSharkieMouth() {
    let mouth = this.getSharkieMouthPosition();

    let isPoisonBubble =
    this.isCharacterNearEndboss(800) &&
    this.character.collectedPoison > 0;

    let bubble = new ThrowableObject(
      mouth.x,
      mouth.y,
      this.character.otherDirection,
      isPoisonBubble
    );

    if (isPoisonBubble) {
      this.character.collectedPoison--;
      this.poisonBar.setPercentage(this.character.collectedPoison * 20);
    }

    this.throwableObjects.push(bubble);
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

  getEndboss() {
    return this.enemies.find((enemy) => enemy instanceof Endboss);
  }

  isCharacterNearEndboss(distance) {
    let endboss = this.getEndboss();
  
    if (!endboss || endboss.isDead()) {
      return false;
    }
  
    return Math.abs(this.character.x - endboss.x) < distance;
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
        this.handleCharacterEnemyCollision(enemy);
      }
    });
  }

  handleCharacterEnemyCollision(enemy) {
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

  checkCollectPoison() {
    this.poisonBottles = this.poisonBottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectPoison();
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

  checkEndbossAttack() {
    let endboss = this.getEndboss();

    if (!endboss || endboss.isDead() || this.gameOver) {
      return;
    }

    if (this.isCharacterNearEndboss(350)) {
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
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.ctx.restore();
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width / 2, 0);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-mo.x - mo.width / 2, 0);
  }

  triggerGameOver() {
    if (this.gameOver) {
      return;
    }

    this.gameOver = true;
    this.character.die();
    this.statusBar.setPercentage(0);
    showGameOverScreen();
  }

  triggerYouWin() {
    if (this.gameOver) {
      return;
    }
  
    this.gameOver = true;
    showYouWinScreen();
  
    this.restartTimeout = setTimeout(() => {
      showStartScreen();
    }, 6000);
  }

  stop() {
    stopGameIntervals();
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.restartTimeout);
  }
}