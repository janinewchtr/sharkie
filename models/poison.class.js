class Poison extends MovableObject {
  height = 80;
  width = 60;
  y = 150;

  IMAGES_IDLE = [
    "img/4. Marcadores/Posi¢n/Animada/1.png",
    "img/4. Marcadores/Posi¢n/Animada/2.png",
    "img/4. Marcadores/Posi¢n/Animada/3.png",
    "img/4. Marcadores/Posi¢n/Animada/4.png",
    "img/4. Marcadores/Posi¢n/Animada/5.png",
    "img/4. Marcadores/Posi¢n/Animada/6.png",
    "img/4. Marcadores/Posi¢n/Animada/7.png",
    "img/4. Marcadores/Posi¢n/Animada/8.png",
  ];

  constructor(x, y) {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
    }, 200);
  }
}