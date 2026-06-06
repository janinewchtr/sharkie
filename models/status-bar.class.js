/**
 * Represents a status bar for life, coins or poison bubbles.
 */
class StatusBar extends DrawableObject {
  IMAGES_LIFE = IMAGE_PATHS.statusBar.life;
  IMAGES_COINS = IMAGE_PATHS.statusBar.coins;
  IMAGES_POISONED_BUBBLES = IMAGE_PATHS.statusBar.poison;
  
    percentage = 100;
    images = [];
  
    /**
     * Creates a status bar of the selected type.
     * @param {string} type - Type of status bar: life, coin or poison.
     */
    constructor(type = "life") {
      super();
      if (type === "life") {
        this.images = this.IMAGES_LIFE;
      } else if (type === "coin") {
        this.images = this.IMAGES_COINS;
      } else if (type === "poison") {
        this.images = this.IMAGES_POISONED_BUBBLES;
      }
  
      this.loadImages(this.images);
      this.x = 20;
      this.y = 0;
      this.width = 150;
      this.height = 50;
      this.setPercentage(100);
    }
  
    /**
     * Sets the percentage and displays the matching status bar image.
     * @param {number} percentage - Current percentage of the status bar.
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.images[this.getImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Updates the status bar to the provided percentage.
     * @param {number} percentage - New percentage of the status bar.
     */
    reducePercentage(percentage) {
      this.setPercentage(percentage);
    }
  
    /**
     * Returns the image index matching the current percentage.
     * @returns {number} Index of the status bar image.
     */
    getImageIndex() {
      if (this.percentage >= 100) {
        return 5;
      } else if (this.percentage >= 80) {
        return 4;
      } else if (this.percentage >= 60) {
        return 3;
      } else if (this.percentage >= 40) {
        return 2;
      } else if (this.percentage >= 20) {
        return 1;
      } else {
        return 0;
      }
    }
  }