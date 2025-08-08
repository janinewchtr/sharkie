class BackgroundObject extends MovableObject {

    width = 720; // Set a default width for the background object
    height = 200; // Set a default height for the background object

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x; // Set a default x position for the background object
        this.y = 400 - this.height; // Set a default y position for the background object
      }
      
  }
  