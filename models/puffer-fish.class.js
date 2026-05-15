class PufferFish extends MovableObject {
  height = 60;
  width = 80;
  y = 250;

  isPuffed = false;
  isTransitioning = false;
  transitionIndex = 0;

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
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
  ]

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_SWIM[0]);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_TRANSITION);

    this.x = x;
    this.y = y;
    this.speed = 0.15 + Math.random() * 0.1;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.checkDistanceToCharacter();

      if (this.isTransitioning) {
        this.playTransitionAnimation();
      } else if (this.isPuffed) {
        this.showPuffedImage();
      } else {
        this.playAnimation(this.IMAGES_SWIM);
      }

      this.x -= 2;
    }, 150);
  }

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

  startPuffing() {
    this.isTransitioning = true;
    this.transitionIndex = 0;
  }

  startUnpuffing() {
    this.isTransitioning = true;
    this.transitionIndex = this.IMAGES_TRANSITION.length - 1;
  }

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

  showPuffedImage() {
    let lastImage = this.IMAGES_TRANSITION[this.IMAGES_TRANSITION.length - 1];
    this.img = this.imageCache[lastImage];
  }
}