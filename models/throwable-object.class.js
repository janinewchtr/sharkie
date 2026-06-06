/**
 * Represents a normal or poisoned bubble thrown by Sharkie.
 */
class ThrowableObject extends MovableObject {
  /**
   * Creates and throws a new bubble.
   * @param {number} x - Horizontal starting position.
   * @param {number} y - Vertical starting position.
   * @param {boolean} otherDirection - Indicates whether Sharkie faces left.
   * @param {boolean} isPoisonBubble - Indicates whether the bubble is poisoned.
   */
  constructor(x, y, otherDirection = false, isPoisonBubble = false) {
    super();
    if (isPoisonBubble) {
      this.loadImage(IMAGE_PATHS.bubbles.poison);
    } else {
      this.loadImage(IMAGE_PATHS.bubbles.normal);
    }
    this.isPoisonBubble = isPoisonBubble;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.otherDirection = otherDirection;
    this.speedX = otherDirection ? -10 : 10;
    this.throw();
  }

  /**
   * Moves the bubble horizontally in Sharkie's viewing direction.
   */
  throw() {
    setStoppableInterval(() => {
      this.x += this.speedX;
    }, 1000 / 60);
  }
}