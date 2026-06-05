class Endboss extends MovableObject {
  height = 600;
  width = 500;
  y = -140;

  energy = 100;
  lastHit = 0;

  isAttacking = false;
  attackFrame = 0;
  attackCounter = 0;
  attackFrameDelay = 2;
  lastAttack = 0;
  attackCooldown = 2000;
  hasHitDuringAttack = false;

  isDeadEndboss = false;
  deadAnimationIndex = 0;
  deadAnimationFinished = false;
  hadFirstContact = false;
  introduceFrameCounter = 0;

  IMAGES_IDLE = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  IMAGES_FLOATING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  IMAGES_ATTACK = [
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
    "img/2.Enemy/3 Final Enemy/Attack/5.png",
    "img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  IMAGES_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  constructor() {
    super().loadImage("img/2.Enemy/3 Final Enemy/2.floating/1.png");
    this.loadEndbossImages();
    this.x = 4000;
    this.animate();
  }

  loadEndbossImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  animate() {
    setStoppableInterval(() => {
      this.handleAnimationInterval();
    }, 150);
  }

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

    this.playDefaultAnimation();
    this.checkFirstContact();
  }

  handleDeath() {
    this.playDeathAnimationOnce();
    this.y -= 3;
  }

  playDefaultAnimation() {
    if (this.introduceFrameCounter < 10) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.playAnimation(this.IMAGES_FLOATING);
    }

    this.introduceFrameCounter++;
  }

  checkFirstContact() {
    if (this.world && this.world.character.x > 4000 && !this.hadFirstContact) {
      this.introduceFrameCounter = 0;
      this.hadFirstContact = true;
    }
  }

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

  canAttack() {
    return Date.now() - this.lastAttack >= this.attackCooldown;
  }

  playAttackAnimation() {
    let path = this.IMAGES_ATTACK[this.attackFrame];
    this.img = this.imageCache[path];

    this.attackCounter++;
    this.hitCharacterOnAttackFrame();
    this.updateAttackFrame();
    this.finishAttackIfNeeded();
  }

  hitCharacterOnAttackFrame() {
    if (this.attackFrame === 3 && !this.hasHitDuringAttack) {
      this.hitCharacter();
      this.hasHitDuringAttack = true;
    }
  }

  updateAttackFrame() {
    if (this.attackCounter >= this.attackFrameDelay) {
      this.attackFrame++;
      this.attackCounter = 0;
    }
  }

  finishAttackIfNeeded() {
    if (this.attackFrame >= this.IMAGES_ATTACK.length) {
      this.isAttacking = false;
      this.attackFrame = 0;
      this.attackCounter = 0;
    }
  }

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

  triggerGameOverIfCharacterIsDead() {
    if (this.world.character.isDead()) {
      this.world.triggerGameOver();
    }
  }

  isCharacterInAttackRange() {
    let character = this.world.character;
    let distanceX = Math.abs(character.x - this.x);
    let distanceY = Math.abs(character.y - this.y);

    return distanceX < 250 && distanceY < 400;
  }

  hit(type) {
    if (!this.canReceiveHit(type)) {
      return;
    }

    this.lastHit = Date.now();
    this.reduceEnergy(type);
    this.checkDeath();
  }

  canReceiveHit(type) {
    return type === "poison" || Date.now() - this.lastHit >= 600;
  }

  reduceEnergy(type) {
    if (type === "poison") {
      this.energy -= 20;
    } else {
      this.energy -= 5;
    }
  }

  checkDeath() {
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDeadEndboss = true;
    }
  }

  isHurt() {
    return Date.now() - this.lastHit < 600 && !this.isDead();
  }

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

