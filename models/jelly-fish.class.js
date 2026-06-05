class JellyFish extends MovableObject {
  height = 80;
  width = 80;
  y = 40;

  isDeadJelly = false;
  deadAnimationPlayed = false;

  IMAGES_IDLE = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_JELLY_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  constructor(x, y) {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_JELLY_DEAD);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      if (this.isDeadJelly) {
        this.playAnimation(this.IMAGES_JELLY_DEAD);
        this.y -= 5;
        return;
      }
  
      this.playAnimation(this.IMAGES_IDLE);
    }, 200);
  }

  dieInBubble() {
    this.isDeadJelly = true;
  }
}