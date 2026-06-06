/**
 * Represents a collectible and animated coin.
 */
class Coin extends MovableObject {
  height = 40;
  width = 40;
  y = 40;

  IMAGES_IDLE = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  /**
   * Creates a coin at the given position and starts its animation.
   * @param {number} x - Horizontal position of the coin.
   * @param {number} y - Vertical position of the coin.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the coin's idle animation.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
    }, 200);
  }
}