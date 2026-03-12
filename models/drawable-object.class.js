class DrawableObject {
    img;
    imageCache = {}; // Array to hold available images for the object
    currentImage = 0;
    x = 0;
    y = 250;
    height = 100; // Set a default height for the movable object
    width = 100;

    loadImage(path) {
        this.img = new Image(); //Abbild von dem img tag <img>
        this.img.src = path;
      }

      draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }

      loadImages(arr) {
        arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img; // Store the loaded image in the cache
        });
      }
}