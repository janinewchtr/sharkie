class MovableObject extends DrawableObject {
  speed = 5;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  lastPoisonHit = 0;
  lastElectroHit = 0;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };


  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit(type) {
    let now = Date.now();
  
    if (now - this.lastHit < 1000) {
      return;
    }
  
    this.lastHit = now;
    this.energy -= 10;
  
    if (this.energy < 0) {
      this.energy = 0;
    }
  
    if (type === "poison") {
      this.lastPoisonHit = now;
    }
  
    if (type === "electro") {
      this.lastElectroHit = now;
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


  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

}