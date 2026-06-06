/**
 * Represents a collectible and animated poison bottle.
 */
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

  /**
   * Creates a poison bottle and starts its animation.
   * @param {number} x - Horizontal position of the poison bottle.
   * @param {number} y - Vertical position of the poison bottle.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the poison bottle's idle animation.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
    }, 200);
  }
}