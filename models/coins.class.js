class Coin extends MovableObject {
    height = 40;
    width = 40;
    y = 40;
  
    IMAGES_IDLE = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];
  
    constructor(x, y) {
      super().loadImage(this.IMAGES_IDLE[0]);
      this.loadImages(this.IMAGES_IDLE);
      this.x = x;
      this.y = y;
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_IDLE);
      }, 200);
    }
  }