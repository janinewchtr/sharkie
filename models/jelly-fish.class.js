/**
 * Represents a jellyfish enemy inside the game world.
 */
class JellyFish extends MovableObject {
  height = 80;
  width = 80;
  y = 40;
  offset = {
    top: 15,
    right: 8,
    bottom: 8,
    left: 8,
  };
  isDeadJelly = false;

  IMAGES_IDLE = IMAGE_PATHS.jellyFish.idle;
  IMAGES_JELLY_DEAD = IMAGE_PATHS.jellyFish.dead;

  /**
   * Creates a jellyfish at the given position and starts its animation.
   * @param {number} x - Horizontal position of the jellyfish.
   * @param {number} y - Vertical position of the jellyfish.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_JELLY_DEAD);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Plays the idle or death animation of the jellyfish.
   */
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

  /**
   * Defeats the jellyfish after being hit by a bubble.
   */
  dieInBubble() {
    this.isDeadJelly = true;
  }
}