/**
 * Represents the endboss and controls his attacks and animations.
 */
class Endboss extends MovableObject {
  height = 600;
  width = 500;
  y = -140;
  offset = {
    top: 220,
    right: 45,
    bottom: 100,
    left: 45,
  };
  energy = 100;
  lastHit = 0;
  isAttacking = false;
  attackFrame = 0;
  attackCounter = 0;
  attackFrameDelay = 2;
  lastAttack = 0;
  attackCooldown = 1000;
  movementSpeed = 15;
  hasHitDuringAttack = false;
  isDeadEndboss = false;
  deadAnimationIndex = 0;
  deadAnimationFinished = false;
  hadFirstContact = false;
  introduceFrameCounter = 0;

  IMAGES_IDLE = IMAGE_PATHS.endboss.introduce;
  IMAGES_FLOATING = IMAGE_PATHS.endboss.floating;
  IMAGES_ATTACK = IMAGE_PATHS.endboss.attack;
  IMAGES_HURT = IMAGE_PATHS.endboss.hurt;
  IMAGES_DEAD = IMAGE_PATHS.endboss.dead;

  /**
   * Creates the endboss, loads his images and starts his animation.
   */
  constructor() {
    super().loadImage(IMAGE_PATHS.endboss.floating[0]);
    this.loadEndbossImages();
    this.x = 4000;
    this.animate();
  }

  /**
   * Loads all images used by the endboss.
   */
  loadEndbossImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Starts the animation interval of the endboss.
   */
  animate() {
    setStoppableInterval(() => {
      this.handleAnimationInterval();
    }, 150);
  }

  /**
   * Selects the correct animation based on the current state.
   */
  handleAnimationInterval() {
    if (this.isDead()) {
      this.handleDeath();
      return;
    }
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      return;
    }
    if (this.isAttacking) {
      this.playAttackAnimation();
      return;
    }
    this.moveTowardsCharacter();
    this.playDefaultAnimation();
    this.playDefaultAnimation();
    this.checkFirstContact();
  }

  /**
   * Plays the death animation and moves the endboss upwards.
   */
  handleDeath() {
    this.playDeathAnimationOnce();
    this.y -= 3;
  }

  /**
   * Plays the introduction or floating animation.
   */
  playDefaultAnimation() {
    if (this.introduceFrameCounter < 10) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.playAnimation(this.IMAGES_FLOATING);
    }
    this.introduceFrameCounter++;
  }

  /**
   * Checks whether Sharkie has reached the endboss for the first time.
   */
  checkFirstContact() {
    if (this.world && this.world.character.x > 4000 && !this.hadFirstContact) {
      this.introduceFrameCounter = 0;
      this.hadFirstContact = true;
    }
  }

  /**
 * Moves the endboss towards Sharkie after their first contact.
 */
moveTowardsCharacter() {
  if (!this.world || !this.hadFirstContact) {
    return;
  }
  let character = this.world.character;
  if (character.x < this.x) {
    this.x -= this.movementSpeed;
  }
}

  /**
   * Starts an attack if the endboss is allowed to attack.
   */
  startAttack() {
    if (this.isAttacking || this.isDead() || this.isHurt()) {
      return;
    }
    if (!this.canAttack()) {
      return;
    }
    this.isAttacking = true;
    this.attackFrame = 0;
    this.attackCounter = 0;
    this.hasHitDuringAttack = false;
    this.lastAttack = Date.now();
  }

  /**
   * Checks whether the attack cooldown has finished.
   * @returns {boolean} True if the endboss can attack.
   */
  canAttack() {
    return Date.now() - this.lastAttack >= this.attackCooldown;
  }

  /**
   * Plays and updates the attack animation.
   */
  playAttackAnimation() {
    let path = this.IMAGES_ATTACK[this.attackFrame];
    this.img = this.imageCache[path];
    this.attackCounter++;
    this.hitCharacterOnAttackFrame();
    this.updateAttackFrame();
    this.finishAttackIfNeeded();
  }

  /**
   * Damages Sharkie during the correct attack frame.
   */
  hitCharacterOnAttackFrame() {
    if (this.attackFrame === 3 && !this.hasHitDuringAttack) {
      this.hitCharacter();
      this.hasHitDuringAttack = true;
    }
  }

  /**
   * Updates the current attack animation frame.
   */
  updateAttackFrame() {
    if (this.attackCounter >= this.attackFrameDelay) {
      this.attackFrame++;
      this.attackCounter = 0;
    }
  }

  /**
   * Finishes and resets the attack animation.
   */
  finishAttackIfNeeded() {
    if (this.attackFrame >= this.IMAGES_ATTACK.length) {
      this.isAttacking = false;
      this.attackFrame = 0;
      this.attackCounter = 0;
    }
  }

  /**
   * Damages Sharkie if he is inside the attack range.
   */
  hitCharacter() {
    if (!this.world || !this.world.character) {
      return;
    }
    if (this.isCharacterInAttackRange()) {
      this.world.character.hit("electro");
      this.world.statusBar.reducePercentage(this.world.character.energy);
      this.triggerGameOverIfCharacterIsDead();
    }
  }

  /**
   * Triggers game over if Sharkie has no energy left.
   */
  triggerGameOverIfCharacterIsDead() {
    if (this.world.character.isDead()) {
      this.world.triggerGameOver();
    }
  }

  /**
   * Checks whether Sharkie is inside the attack range.
   * @returns {boolean} True if Sharkie is inside the attack range.
   */
  isCharacterInAttackRange() {
    let character = this.world.character;
    let distanceX = Math.abs(character.x - this.x);
    let distanceY = Math.abs(character.y - this.y);
    return distanceX < 200 && distanceY < 300;
  }

  /**
   * Damages the endboss with the given attack type.
   * @param {string} type - Type of attack hitting the endboss.
   */
  hit(type) {
    if (!this.canReceiveHit(type)) {
      return;
    }
    this.lastHit = Date.now();
    this.reduceEnergy(type);
    this.checkDeath();
  }

  /**
   * Checks whether the endboss can receive another hit.
   * @param {string} type - Type of attack hitting the endboss.
   * @returns {boolean} True if the endboss can receive the hit.
   */
  canReceiveHit(type) {
    return type === "poison" || Date.now() - this.lastHit >= 600;
  }

  /**
   * Reduces the endboss energy based on the attack type.
   * @param {string} type - Type of attack hitting the endboss.
   */
  reduceEnergy(type) {
    if (type === "poison") {
      this.energy -= 20;
    } else {
      this.energy -= 5;
    }
  }

  /**
   * Checks whether the endboss has been defeated.
   */
  checkDeath() {
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDeadEndboss = true;
    }
  }

  /**
   * Checks whether the endboss was recently damaged.
   * @returns {boolean} True if the endboss is hurt.
   */
  isHurt() {
    return Date.now() - this.lastHit < 600 && !this.isDead();
  }

  /**
   * Plays the endboss death animation once.
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
}
