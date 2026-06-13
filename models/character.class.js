/**
 * Represents Sharkie and controls his movement, attacks and animations.
 */
class Character extends MovableObject {
  height = 250;
  width = 200;
  y = 40;

  offset = {
    top: 117,
    right: 40,
    bottom: 62,
    left: 40,
  };
  isSwimming = false;
  lastMove = Date.now();
  longIdleHold = 5000;
  collectedPoison = 0;
  collectedCoins = 0;
  isBubbleAttacking = false;
  bubbleAttackFrame = 0;
  bubbleAttackCounter = 0;
  bubbleAttackFrameDelay = 3;
  isFinSlap = false;
  finSlapFrame = 0;
  finSlapCounter = 0;
  finSlapFrameDelay = 3;
  deadAnimationIndex = 0;
  deadAnimationFinished = false;
  world;
  currentImage = 0;

  IMAGES_IDLE = IMAGE_PATHS.character.idle;
  IMAGES_LONG_IDLE = IMAGE_PATHS.character.longIdle;
  IMAGES_SWIM = IMAGE_PATHS.character.swim;
  IMAGES_HURT_POISONED = IMAGE_PATHS.character.hurtPoisoned;
  IMAGES_HURT_ELECTRO = IMAGE_PATHS.character.hurtElectro;
  IMAGES_DEAD = IMAGE_PATHS.character.dead;
  IMAGES_ATTACK = IMAGE_PATHS.character.bubbleAttack;
  IMAGES_FIN_SLAP = IMAGE_PATHS.character.finSlap;
  IMAGES_WHALE_ATTACK = IMAGE_PATHS.character.whaleAttack;

    /**
   * Creates Sharkie and loads all character images.
   */
    constructor() {
      super();
      this.loadImage(IMAGE_PATHS.character.start);
      this.loadCharacterImages();
    }
  
    /**
     * Loads all images used by Sharkie's animations.
     */
    loadCharacterImages() {
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_LONG_IDLE);
      this.loadImages(this.IMAGES_SWIM);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_WHALE_ATTACK);
      this.loadImages(this.IMAGES_FIN_SLAP);
      this.loadImages(this.IMAGES_HURT_POISONED);
      this.loadImages(this.IMAGES_HURT_ELECTRO);
      this.loadImages(this.IMAGES_DEAD);
    }
  
    /**
     * Starts Sharkie's movement and animation intervals.
     */
    start() {
      this.animate();
    }
  
    /**
     * Creates the intervals used for movement and animations.
     */
    animate() {
      setStoppableInterval(() => this.handleMovementInterval(), 1000 / 60);
      setStoppableInterval(() => this.handleAnimationInterval(), 200);
    }
  
    /**
     * Handles movement, attacks and floating after death.
     */
    handleMovementInterval() {
      if (this.isDead()) {
        this.floatAwayAfterDeath();
        return;
      }
      if (this.isBubbleAttacking) {
        this.playBubbleAttack();
        return;
      }
      if (this.isFinSlap) {
        this.playFinSlapAttack();
        return;
      }
      this.handleMovement();
      this.updateCamera();
    }
  
    /**
     * Selects the correct animation based on Sharkie's current state.
     */
    handleAnimationInterval() {
      if (this.isDead()) {
        this.playDeathAnimationOnce();
      } else if (this.isHurtElectro()) {
        this.playAnimation(this.IMAGES_HURT_ELECTRO);
      } else if (this.isHurtPoisoned()) {
        this.playAnimation(this.IMAGES_HURT_POISONED);
      } else if (this.isSwimming) {
        this.playAnimation(this.IMAGES_SWIM);
      } else if (this.isLongIdle()) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }
  
    /**
     * Checks whether Sharkie has been inactive for a longer time.
     * @returns {boolean} True if Sharkie is in long-idle mode.
     */
    isLongIdle() {
      return Date.now() - this.lastMove > this.longIdleHold;
    }
  
    /**
     * Starts Sharkie's bubble attack.
     */
    startBubbleAttack() {
      if (this.isBubbleAttacking) return;
      this.isBubbleAttacking = true;
      this.bubbleAttackFrame = 0;
    }
  
    /**
     * Plays the bubble attack animation.
     */
    playBubbleAttack() {
      let path = this.IMAGES_ATTACK[this.bubbleAttackFrame];
      this.img = this.imageCache[path];
      this.bubbleAttackCounter++;
      if (this.bubbleAttackCounter >= this.bubbleAttackFrameDelay) {
        this.bubbleAttackFrame++;
        this.bubbleAttackCounter = 0;
      }
      if (this.bubbleAttackFrame >= this.IMAGES_ATTACK.length) {
        this.finishBubbleAttack();
      }
    }
  
    /**
     * Finishes the bubble attack and creates a bubble.
     */
    finishBubbleAttack() {
      this.isBubbleAttacking = false;
      this.bubbleAttackFrame = 0;
      this.bubbleAttackCounter = 0;
      this.world.createBubbleFromSharkieMouth();
    }
  
    /**
     * Starts Sharkie's fin-slap attack.
     */
    startFinSlap() {
      if (this.isFinSlap) return;
      this.isFinSlap = true;
      this.finSlapFrame = 0;
      this.finSlapCounter = 0;
    }
  
    /**
     * Plays the fin-slap attack animation.
     */
    playFinSlapAttack() {
      let path = this.IMAGES_FIN_SLAP[this.finSlapFrame];
      this.img = this.imageCache[path];
      this.finSlapCounter++;
      if (this.finSlapCounter >= this.finSlapFrameDelay) {
        this.finSlapFrame++;
        this.finSlapCounter = 0;
      }
      if (this.finSlapFrame >= this.IMAGES_FIN_SLAP.length) {
        this.finishFinSlapAttack();
      }
    }
  
    /**
     * Finishes and resets the fin-slap attack.
     */
    finishFinSlapAttack() {
      this.isFinSlap = false;
      this.finSlapFrame = 0;
      this.finSlapCounter = 0;
    }
  
    /**
     * Handles horizontal and vertical character movement.
     */
    handleMovement() {
      let isMoving = false;
      isMoving = this.moveHorizontally() || isMoving;
      isMoving = this.moveVertically() || isMoving;
      this.updateSwimmingState(isMoving);
    }
  
    /**
     * Moves Sharkie horizontally based on the keyboard input.
     * @returns {boolean} True if Sharkie moved horizontally.
     */
    moveHorizontally() {
      if (this.world.keyboard.RIGHT) {
        this.moveRight();
        return true;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        return true;
      }
      return false;
    }
  
    /**
     * Moves Sharkie vertically based on the keyboard input.
     * @returns {boolean} True if Sharkie moved vertically.
     */
    moveVertically() {
      if (this.world.keyboard.UP && this.y > -60) {
        this.moveUp();
        return true;
      }
      if (
        this.world.keyboard.DOWN &&
        this.y < this.world.canvas.height - this.height
      ) {
        this.moveDown();
        return true;
      }
      return false;
    }
  
    /**
     * Moves Sharkie to the right.
     */
    moveRight() {
      this.x += this.speed;
      this.otherDirection = false;
    }
  
    /**
     * Moves Sharkie to the left.
     */
    moveLeft() {
      this.x -= this.speed;
      this.otherDirection = true;
    }
  
    /**
     * Moves Sharkie upwards.
     */
    moveUp() {
      this.y -= this.speed;
    }
  
    /**
     * Moves Sharkie downwards.
     */
    moveDown() {
      this.y += this.speed;
    }
  
    /**
     * Updates Sharkie's swimming state and last movement time.
     * @param {boolean} isMoving - Indicates whether Sharkie is moving.
     */
    updateSwimmingState(isMoving) {
      this.isSwimming = isMoving;
      if (isMoving) {
        this.lastMove = Date.now();
      }
    }
  
    /**
     * Updates the camera position based on Sharkie's position.
     */
    updateCamera() {
      this.world.camera_x = -this.x;
    }
  
    /**
     * Adds a collected poison bottle up to the maximum amount.
     */
    collectPoison() {
      if (this.collectedPoison < 5) {
        this.collectedPoison++;
      }
    }
  
    /**
     * Adds a collected coin.
     */
    collectCoins() {
      this.collectedCoins++;
    }
  
    /**
     * Removes Sharkie's remaining energy and stops active attacks.
     */
    die() {
      this.energy = 0;
      this.isBubbleAttacking = false;
      this.isFinSlap = false;
    }
  
    /**
     * Plays Sharkie's death animation once.
     */
    playDeathAnimationOnce() {
      if (!this.deadAnimationFinished) {
        let path = this.IMAGES_DEAD[this.deadAnimationIndex];
        this.img = this.imageCache[path];
        this.deadAnimationIndex++;
        if (this.deadAnimationIndex >= this.IMAGES_DEAD.length) {
          this.deadAnimationIndex = this.IMAGES_DEAD.length - 1;
          this.deadAnimationFinished = true;
        }
      }
    }
  
    /**
     * Moves Sharkie upwards after the death animation has finished.
     */
    floatAwayAfterDeath() {
      if (this.deadAnimationFinished) {
        this.y -= 2;
      }
    }
  }