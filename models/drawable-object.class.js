/**
 * Represents an object that can be drawn onto the canvas.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 0;
  y = 250;
  height = 100;
  width = 100;

  /**
   * Loads a single image for the object.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object onto the canvas.
   * @param {CanvasRenderingContext2D} ctx - Canvas drawing context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

/**
 * Draws the collision frame of supported game objects.
 * @param {CanvasRenderingContext2D} ctx - Canvas drawing context.
 */
drawFrame(ctx) {
  if (!this.canDrawFrame()) {
    return;
  }

  this.drawCollisionFrame(ctx);
}

/**
 * Checks whether this object supports a collision frame.
 * @returns {boolean} True if a collision frame can be drawn.
 */
canDrawFrame() {
  return (
    this instanceof Character ||
    this instanceof Endboss ||
    this instanceof PufferFish ||
    this instanceof JellyFish ||
    this instanceof Poison
  );
}

/**
 * Draws the collision frame onto the canvas.
 * @param {CanvasRenderingContext2D} ctx - Canvas drawing context.
 */
drawCollisionFrame(ctx) {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "transparent";
  ctx.rect(
    this.x + this.offset.left,
    this.y + this.offset.top,
    this.width - this.offset.left - this.offset.right,
    this.height - this.offset.top - this.offset.bottom
  );
  ctx.stroke();
}

  /**
   * Loads multiple images and saves them inside the image cache.
   * @param {string[]} imagePaths - Paths of the images that should be loaded.
   */
  loadImages(imagePaths) {
    imagePaths.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}