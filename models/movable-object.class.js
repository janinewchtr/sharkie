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
  speedY = 0;
  acceleration = 1;


  applyGravity() {
    setInterval(() => {
      if (this.y < 60) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  loadImage(path) {
    this.img = new Image(); //Abbild von dem img tag <img>
    this.img.src = path;
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