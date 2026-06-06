/**
 * Controls the game world, collisions, attacks and drawing.
 */
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

  /**
   * Creates and starts a new game world.
   * @param {HTMLCanvasElement} canvas - Canvas used to display the game.
   * @param {Keyboard} keyboard - Keyboard controls of the player.
   */
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

  /**
   * Sets the starting positions and values of the status bars.
   */
  initBars() {
    this.poisonBar.y = 30;
    this.poisonBar.setPercentage(0);
    this.coinBar.y = 60;
    this.coinBar.setPercentage(0);
  }

  /**
   * Creates the character and all objects belonging to the level.
   */
  initLevel() {
    this.character = new Character();
    this.levelWidth = getLevelWidth();
    this.backgroundObjects = createLevelBackgroundObjects();
    this.enemies = createLevelEnemies(this.levelWidth);
    this.poisonBottles = createLevelPoisonBottles();
    this.coins = createLevelCoins();
    this.maxCoins = this.coins.length;
  }

  /**
   * Gives the character and enemies access to the current world.
   */
  setWorld() {
    this.character.world = this;
    this.enemies.forEach((enemy) => (enemy.world = this));
  }

  /**
   * Updates the camera position and keeps it inside the level.
   */
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

  /**
   * Starts the interval that checks the main game actions.
   */
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
      this.checkEndbossFightLost();
    }, 100);
  }

  /**
   * Removes bubbles that have left the visible canvas area.
   */
  removeBubblesOutsideCanvas() {
    this.throwableObjects = this.throwableObjects.filter((bubble) => {
      let screenX = bubble.x + this.camera_x;
      return screenX > -bubble.width && screenX < this.canvas.width;
    });
  }

  /**
   * Checks whether the player wants and is allowed to throw a bubble.
   */
  checkThrowObjects() {
    if (this.gameOver) {
      return;
    }
    if (
      this.keyboard.D &&
      this.canThrowBubble() &&
      !this.character.isBubbleAttacking
    ) {
      this.character.startBubbleAttack();
      this.lastBubbleThrow = Date.now();
    }
  }

  /**
   * Checks whether the bubble cooldown has finished.
   * @returns {boolean} True if another bubble can be thrown.
   */
  canThrowBubble() {
    return Date.now() - this.lastBubbleThrow > this.bubbleCooldown;
  }

  /**
   * Creates a normal or poison bubble at Sharkie's mouth.
   */
  createBubbleFromSharkieMouth() {
    let mouth = this.getSharkieMouthPosition();
    let isPoisonBubble =
      this.isCharacterNearEndboss(800) && this.character.collectedPoison > 0;
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

  /**
   * Calculates Sharkie's mouth position based on his direction.
   * @returns {{x: number, y: number}} Position of Sharkie's mouth.
   */
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

  /**
   * Finds the endboss inside the enemy list.
   * @returns {Endboss|undefined} The endboss or undefined.
   */
  getEndboss() {
    return this.enemies.find((enemy) => enemy instanceof Endboss);
  }

  /**
   * Checks whether Sharkie is near the endboss.
   * @param {number} distance - Maximum distance from the endboss.
   * @returns {boolean} True if Sharkie is near the endboss.
   */
  isCharacterNearEndboss(distance) {
    let endboss = this.getEndboss();
    if (!endboss || endboss.isDead()) {
      return false;
    }
    return Math.abs(this.character.x - endboss.x) < distance;
  }

  /**
   * Checks whether Sharkie performs a fin-slap attack.
   */
  checkFinSlapAttack() {
    if (this.keyboard.SPACE && !this.character.isFinSlap) {
      this.character.startFinSlap();
      this.hitPufferFishWithFinSlap();
    }
  }

  /**
   * Defeats colliding puffer fish during a fin-slap attack.
   */
  hitPufferFishWithFinSlap() {
    this.enemies.forEach((enemy) => {
      if (enemy instanceof PufferFish && !enemy.isDeadPuffer) {
        if (this.character.isColliding(enemy)) {
          enemy.dieByFinSlap();
        }
      }
    });
  }

/**
 * Checks collisions between bubbles and enemies.
 */
checkBubbleCollisions() {
  this.throwableObjects.forEach((bubble, bubbleIndex) => {
    this.enemies.forEach((enemy) => {
      this.handleBubbleEnemyCollision(bubble, bubbleIndex, enemy);
    });
  });
}

/**
 * Handles a collision between a bubble and an enemy.
 * @param {ThrowableObject} bubble - Colliding bubble.
 * @param {number} bubbleIndex - Position of the bubble inside the array.
 * @param {MovableObject} enemy - Colliding enemy.
 */
handleBubbleEnemyCollision(bubble, bubbleIndex, enemy) {
  if (!bubble.isColliding(enemy)) {
    return;
  }

  if (enemy instanceof JellyFish && !enemy.isDeadJelly) {
    this.defeatJellyFish(enemy, bubbleIndex);
  }

  if (enemy instanceof Endboss && !enemy.isDead() && bubble.isPoisonBubble) {
    this.hitEndbossWithBubble(enemy, bubbleIndex);
  }
}

/**
 * Defeats a jellyfish and removes the bubble.
 * @param {JellyFish} jellyFish - Jellyfish hit by the bubble.
 * @param {number} bubbleIndex - Position of the bubble inside the array.
 */
defeatJellyFish(jellyFish, bubbleIndex) {
  jellyFish.dieInBubble();
  this.throwableObjects.splice(bubbleIndex, 1);
}

/**
 * Damages the endboss and removes the poison bubble.
 * @param {Endboss} endboss - Endboss hit by the poison bubble.
 * @param {number} bubbleIndex - Position of the bubble inside the array.
 */
hitEndbossWithBubble(endboss, bubbleIndex) {
  endboss.hit("poison");
  this.throwableObjects.splice(bubbleIndex, 1);

  if (endboss.isDead()) {
    this.triggerYouWin();
  }
}

  /**
   * Checks collisions between Sharkie and living enemies.
   */
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

  /**
   * Handles damage caused by an enemy collision.
   * @param {MovableObject} enemy - Enemy colliding with Sharkie.
   */
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

  /**
   * Checks whether Sharkie collects poison bottles.
   */
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

  /**
   * Checks whether Sharkie collects coins.
   */
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

  /**
   * Starts the endboss attack when Sharkie is close enough.
   */
  checkEndbossAttack() {
    let endboss = this.getEndboss();
    if (!endboss || endboss.isDead() || this.gameOver) {
      return;
    }
    if (this.isCharacterNearEndboss(350)) {
      endboss.startAttack();
    }
  }

  /**
   * Counts all poison bubbles currently flying through the level.
   * @returns {number} Number of active poison bubbles.
   */
  countActivePoisonBubbles() {
    return this.throwableObjects.filter((bubble) => bubble.isPoisonBubble)
      .length;
  }

  /**
   * Checks whether Sharkie has run out of poison during the endboss fight.
   */
  checkEndbossFightLost() {
    let endboss = this.getEndboss();
    if (!this.isCharacterNearEndboss(350)) {
      return;
    }
    if (!endboss || endboss.isDead()) {
      return;
    }
    if (this.character.collectedPoison > 0) {
      return;
    }
    if (this.countActivePoisonBubbles() > 0) {
      return;
    }
    this.triggerGameOver();
  }

  /**
   * Draws all game objects and requests the next animation frame.
   */
/**
 * Draws all game objects and requests the next animation frame.
 */
draw() {
  this.updateCamera();
  this.clearCanvas();
  this.drawBackgroundObjects();
  this.drawStatusBars();
  this.drawGameObjects();
  this.animationFrameId = requestAnimationFrame(() => this.draw());
}

/**
 * Clears the canvas.
 */
clearCanvas() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

/**
 * Draws all background objects using the camera position.
 */
drawBackgroundObjects() {
  this.ctx.save();
  this.ctx.translate(this.camera_x, 0);
  this.addObjectsToMap(this.backgroundObjects);
  this.ctx.restore();
}

/**
 * Draws all status bars without moving them with the camera.
 */
drawStatusBars() {
  this.addToMap(this.statusBar);
  this.addToMap(this.poisonBar);
  this.addToMap(this.coinBar);
}

/**
 * Draws all moving and collectible game objects.
 */
drawGameObjects() {
  this.ctx.save();
  this.ctx.translate(this.camera_x, 0);
  this.addGameObjectsToMap();
  this.ctx.restore();
}

/**
 * Adds all moving and collectible objects to the canvas.
 */
addGameObjectsToMap() {
  this.addToMap(this.character);
  this.addObjectsToMap(this.enemies);
  this.addObjectsToMap(this.poisonBottles);
  this.addObjectsToMap(this.coins);
  this.addObjectsToMap(this.throwableObjects);
}

  /**
   * Adds multiple objects to the canvas.
   * @param {DrawableObject[]} objects - Objects that should be drawn.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  /**
   * Draws one object on the canvas.
   * @param {DrawableObject} mo - Object that should be drawn.
   */
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

  /**
   * Flips an object horizontally on the canvas.
   * @param {DrawableObject} mo - Object that should be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width / 2, 0);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-mo.x - mo.width / 2, 0);
  }

  /**
   * Ends the game and displays the game-over screen.
   */
  triggerGameOver() {
    if (this.gameOver) {
      return;
    }
    this.gameOver = true;
    this.character.die();
    this.statusBar.setPercentage(0);
    showGameOverScreen();
  }

  /**
   * Ends the game and displays the victory screen.
   */
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

  /**
   * Stops all running intervals, animations and timeouts.
   */
  stop() {
    stopGameIntervals();
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.restartTimeout);
  }
}
