/**
 * Represents a background layer inside the game world.
 */
class BackgroundObject extends MovableObject {
    width = 920;
    height = 400;
  
    /**
     * Creates a new background object.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background.
     */
    constructor(imagePath, x) {
      super();
      this.loadImage(imagePath);
      this.x = x;
      this.y = 400 - this.height;
    }
  }