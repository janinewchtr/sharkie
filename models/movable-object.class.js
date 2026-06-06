/**
 * Represents a drawable object that can move, collide and receive damage.
 */
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

  /**
   * Checks whether this object is colliding with another object.
   * @param {MovableObject} mo - Object checked for collision.
   * @returns {boolean} True if both objects are colliding.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

/**
 * Reduces the object's energy and saves the damage type.
 * @param {string} type - Type of received damage.
 */
hit(type) {
  let now = Date.now();

  if (!this.canReceiveDamage(now)) {
    return;
  }

  this.lastHit = now;
  this.reduceEnergy();
  this.saveDamageType(type, now);
}

/**
 * Checks whether the object can receive damage.
 * @param {number} now - Current timestamp.
 * @returns {boolean} True if damage can be received.
 */
canReceiveDamage(now) {
  return now - this.lastHit >= 1000;
}

/**
 * Reduces the object's energy.
 */
reduceEnergy() {
  this.energy -= 10;

  if (this.energy < 0) {
    this.energy = 0;
  }
}

/**
 * Saves when a specific damage type was received.
 * @param {string} type - Type of received damage.
 * @param {number} now - Current timestamp.
 */
saveDamageType(type, now) {
  if (type === "poison") {
    this.lastPoisonHit = now;
  }

  if (type === "electro") {
    this.lastElectroHit = now;
  }
}

  /**
   * Checks whether the object has no energy left.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks whether the object was recently poisoned.
   * @returns {boolean} True if the object is hurt by poison.
   */
  isHurtPoisoned() {
    let timePassed = Date.now() - this.lastPoisonHit;
    return timePassed < 1000;
  }

  /**
   * Checks whether the object recently received an electric shock.
   * @returns {boolean} True if the object is hurt by electricity.
   */
  isHurtElectro() {
    let timePassed = Date.now() - this.lastElectroHit;
    return timePassed < 1000;
  }

  /**
   * Plays the next image of an animation.
   * @param {string[]} images - Image paths belonging to the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}