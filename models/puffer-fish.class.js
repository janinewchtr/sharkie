class PufferFish extends MovableObject {
  height = 60; // Set a default height for the puffer fish
  width = 80; // Set a default width for the puffer fish
  y = 250; // Set a default y position for the puffer fish

  constructor() {
    super().loadImage(
      "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png"
    );
    this.x = 200 + Math.random() * 500;
    this.animate();
  }

  animate() {
    let animateIndex = 1;
    setInterval(() => {
      if (animateIndex < 3) {
        this.img.src = `../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim${animateIndex}.png`;
        animateIndex++;
      } else {
        animateIndex = 1;
      }
      this.x -= 2; // Move the puffer fish to the left
    }, 200);
  }
}
