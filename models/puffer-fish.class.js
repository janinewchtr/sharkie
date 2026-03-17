class PufferFish extends MovableObject {
  height = 60;
  width = 80;
  y = 250;

  constructor(x, y) {
    super();
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
    this.x = x;
    this.y = y;
    this.speed = 0.15 + Math.random() * 0.1;
    this.animate();
  }

  animate() {
    let animateIndex = 1;

    setInterval(() => {
      if (animateIndex < 3) {
        this.img.src = `img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim${animateIndex}.png`;
        animateIndex++;
      } else {
        animateIndex = 1;
      }

      this.x -= 2;
    }, 100);
  }
}
