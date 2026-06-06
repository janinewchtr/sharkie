/**
 * Represents a puffer fish enemy and controls its animations.
 */
class PufferFish extends MovableObject {
  height = 60;
  width = 80;
  y = 250;

  isPuffed = false;
  isTransitioning = false;
  transitionIndex = 0;
  isDeadPuffer = false;
  deadAnimationIndex = 0;
  deadAnimationFinished = false;

  IMAGES_SWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
  ];

  IMAGES_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
  ];

  /**
   * Creates a puffer fish and starts its animation.
   * @param {number} x - Horizontal position of the puffer fish.
   * @param {number} y - Vertical position of the puffer fish.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_SWIM[0]);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_TRANSITION);
    this.loadImages(this.IMAGES_DEAD);

    this.x = x;
    this.y = y;
    this.speed = 0.15 + Math.random() * 0.1;

    this.animate();
  }

  /**
   * Starts the movement and animations of the puffer fish.
   */
  animate() {
    setStoppableInterval(() => {
      this.checkDistanceToCharacter();

      if (this.isDeadPuffer) {
        this.playDeathAnimationOnce();
        this.y += 10;
      } else if (this.isTransitioning) {
        this.playTransitionAnimation();
      } else if (this.isPuffed) {
        this.showPuffedImage();
      } else {
        this.playAnimation(this.IMAGES_SWIM);
      }

      this.x -= 2;
    }, 150);
  }

  /**
   * Checks the distance to Sharkie and starts a transition if needed.
   */
  checkDistanceToCharacter() {
    if (!this.world || !this.world.character || this.isTransitioning) {
      return;
    }

    let distance = Math.abs(this.world.character.x - this.x);

    if (distance < 250 && !this.isPuffed) {
      this.startPuffing();
    }

    if (distance > 350 && this.isPuffed) {
      this.startUnpuffing();
    }
  }

  /**
   * Starts the transition into the puffed state.
   */
  startPuffing() {
    this.isTransitioning = true;
    this.transitionIndex = 0;
  }

  /**
   * Starts the transition back into the normal state.
   */
  startUnpuffing() {
    this.isTransitioning = true;
    this.transitionIndex = this.IMAGES_TRANSITION.length - 1;
  }

  /**
   * Plays the puffing or unpuffing transition animation.
   */
  playTransitionAnimation() {
    let path = this.IMAGES_TRANSITION[this.transitionIndex];
    this.img = this.imageCache[path];
    if (!this.isPuffed) {
      this.transitionIndex++;
      if (this.transitionIndex >= this.IMAGES_TRANSITION.length) {
        this.isTransitioning = false;
        this.isPuffed = true;
      }
    } else {
      this.transitionIndex--;
      if (this.transitionIndex < 0) {
        this.isTransitioning = false;
        this.isPuffed = false;
      }
    }
  }

  /**
   * Displays the fully puffed image.
   */
  showPuffedImage() {
    let lastImage = this.IMAGES_TRANSITION[this.IMAGES_TRANSITION.length - 1];
    this.img = this.imageCache[lastImage];
  }

  /**
   * Defeats the puffer fish after being hit by a fin slap.
   */
  dieByFinSlap() {
    if (this.isDeadPuffer) return;
    this.isDeadPuffer = true;
    this.deadAnimationIndex = 0;
    this.playDeathAnimationOnce();
  }

  /**
   * Plays the death animation once.
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