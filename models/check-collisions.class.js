/**
 * Handles collisions, collections and combat checks.
 */
class Collisions {
    /**
     * Creates the collision checks for the given world.
     * @param {World} world - Current game world.
     */
    constructor(world) {
      this.world = world;
    }
  
/**
 * Runs all regularly required collision and combat checks.
 */
runChecks() {
  this.checkFinSlapAttack();
  this.checkCollisions();
  this.checkCollectPoison();
  this.checkCollectCoins();
  this.checkBubbleCollisions();
  this.checkEndbossAttack();
  this.checkEndbossFightLost();
}
  
/**
 * Starts the fin slap and checks for hits during the animation.
 */
checkFinSlapAttack() {
  let character = this.world.character;
  if (this.world.keyboard.SPACE && !character.isFinSlap) {
    character.startFinSlap();
  }
  if (character.isFinSlap) {
    this.hitPufferFishWithFinSlap();
  }
}
  
    /**
     * Defeats colliding puffer fish during a fin-slap attack.
     */
    hitPufferFishWithFinSlap() {
      this.world.enemies.forEach((enemy) => {
        if (enemy instanceof PufferFish && !enemy.isDeadPuffer) {
          if (this.world.character.isColliding(enemy)) {
            enemy.dieByFinSlap();
          }
        }
      });
    }
  
    /**
     * Checks collisions between bubbles and enemies.
     */
    checkBubbleCollisions() {
      this.world.throwableObjects.forEach((bubble, bubbleIndex) => {
        this.world.enemies.forEach((enemy) => {
          this.handleBubbleEnemyCollision(bubble, bubbleIndex, enemy);
        });
      });
    }
  
    /**
     * Handles a collision between a bubble and an enemy.
     * @param {ThrowableObject} bubble - Colliding bubble.
     * @param {number} bubbleIndex - Position of the bubble.
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
     * @param {number} bubbleIndex - Position of the bubble.
     */
    defeatJellyFish(jellyFish, bubbleIndex) {
      jellyFish.dieInBubble();
      this.world.throwableObjects.splice(bubbleIndex, 1);
    }
  
    /**
     * Damages the endboss and removes the poison bubble.
     * @param {Endboss} endboss - Endboss hit by the poison bubble.
     * @param {number} bubbleIndex - Position of the bubble.
     */
    hitEndbossWithBubble(endboss, bubbleIndex) {
      endboss.hit("poison");
      this.world.throwableObjects.splice(bubbleIndex, 1);
  
      if (endboss.isDead()) {
        this.world.triggerYouWin();
      }
    }
  
    /**
     * Checks collisions between Sharkie and living enemies.
     */
    checkCollisions() {
      this.world.enemies.forEach((enemy) => {
        if (this.isLivingEnemy(enemy)) {
          this.checkCharacterCollision(enemy);
        }
      });
    }
  
    /**
     * Checks whether an enemy is still alive.
     * @param {MovableObject} enemy - Enemy that should be checked.
     * @returns {boolean} True if the enemy is alive.
     */
    isLivingEnemy(enemy) {
      if (enemy instanceof Endboss && enemy.isDead()) return false;
      if (enemy instanceof JellyFish && enemy.isDeadJelly) return false;
      if (enemy instanceof PufferFish && enemy.isDeadPuffer) return false;
      return true;
    }
  
/**
 * Checks whether Sharkie collides with an enemy.
 * @param {MovableObject} enemy - Enemy that should be checked.
 */
checkCharacterCollision(enemy) {
  let character = this.world.character;
  if (!character.isColliding(enemy)) {
    return;
  }
  if (enemy instanceof PufferFish && character.isFinSlap) {
    return;
  }
  this.handleCharacterEnemyCollision(enemy);
}
  
    /**
     * Handles damage caused by an enemy collision.
     * @param {MovableObject} enemy - Enemy colliding with Sharkie.
     */
    handleCharacterEnemyCollision(enemy) {
      this.damageCharacter(enemy);
      this.world.statusBar.reducePercentage(this.world.character.energy);
  
      if (this.world.character.isDead()) {
        this.world.triggerGameOver();
      }
    }
  
    /**
     * Damages Sharkie based on the enemy type.
     * @param {MovableObject} enemy - Enemy damaging Sharkie.
     */
    damageCharacter(enemy) {
      if (enemy instanceof PufferFish) {
        this.world.character.hit("poison");
      } else {
        this.world.character.hit("electro");
      }
    }
  
    /**
     * Checks whether Sharkie collects poison bottles.
     */
    checkCollectPoison() {
      this.world.poisonBottles = this.world.poisonBottles.filter((bottle) => {
        if (this.world.character.isColliding(bottle)) {
          this.collectPoison();
          return false;
        }
  
        return true;
      });
    }
  
    /**
     * Adds poison and updates its status bar.
     */
    collectPoison() {
      this.world.character.collectPoison();
      let poison = this.world.character.collectedPoison;
      this.world.poisonBar.setPercentage(poison * 20);
    }
  
    /**
     * Checks whether Sharkie collects coins.
     */
    checkCollectCoins() {
      this.world.coins = this.world.coins.filter((coin) => {
        if (this.world.character.isColliding(coin)) {
          this.collectCoin();
          return false;
        }
  
        return true;
      });
    }
  
    /**
     * Adds a coin and updates its status bar.
     */
    collectCoin() {
      this.world.character.collectCoins();
      let coins = this.world.character.collectedCoins;
      let percentage = coins * (100 / this.world.maxCoins);
      this.world.coinBar.setPercentage(percentage);
    }
  
    /**
     * Starts the endboss attack when Sharkie is close enough.
     */
    checkEndbossAttack() {
      let endboss = this.world.getEndboss();
  
      if (!endboss || endboss.isDead() || this.world.gameOver) {
        return;
      }
  
      if (this.world.isCharacterNearEndboss(350)) {
        endboss.startAttack();
      }
    }
  
    /**
     * Counts all active poison bubbles.
     * @returns {number} Number of active poison bubbles.
     */
    countActivePoisonBubbles() {
      return this.world.throwableObjects.filter((bubble) => {
        return bubble.isPoisonBubble;
      }).length;
    }
  
    /**
     * Checks whether Sharkie has lost the endboss fight.
     */
    checkEndbossFightLost() {
      let endboss = this.world.getEndboss();
  
      if (!this.world.isCharacterNearEndboss(350)) return;
      if (!endboss || endboss.isDead()) return;
      if (this.world.character.collectedPoison > 0) return;
      if (this.countActivePoisonBubbles() > 0) return;
  
      this.world.triggerGameOver();
    }
  }