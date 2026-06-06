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
      this.loadImage(
        "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
      );
    } else {
      this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
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