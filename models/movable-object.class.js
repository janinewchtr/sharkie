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
  energy = 100;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };


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
    ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurtPoisoned() {
    let timePassed = new Date().getTime() - this.lastPoisonHit;
    return timePassed < 1000;
  }
  
  isHurtElectro() {
    let timePassed = new Date().getTime() - this.lastElectroHit;
    return timePassed < 1000;
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