/**
 * Represents a collectible and animated poison bottle.
 */
class Poison extends MovableObject {
  height = 80;
  width = 60;
  y = 150;

  IMAGES_IDLE = IMAGE_PATHS.poison;

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