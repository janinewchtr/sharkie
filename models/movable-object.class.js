class MovableObject {
  x = 0;
  y = 250;
  img;
  height = 100; // Set a default height for the movable object
  width = 100;
  imageCache = {}; // Array to hold available images for the object
  currentImage = 0;
  speed = 5;
  otherDirection = false;


  loadImage(path) {
    this.img = new Image(); //Abbild von dem img tag <img>
    this.img.src = path;
  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {

    if(this instanceof Character || this instanceof Endboss || this instanceof PufferFish || this instanceof JellyFish || this instanceof Poison) {
    ctx.beginPath();
    ctx.linewidth = '2';
    ctx.strokeStyle = 'red';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img; // Store the loaded image in the cache
    });
  }

  moveRight() {
    console.log("moving right");
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

}