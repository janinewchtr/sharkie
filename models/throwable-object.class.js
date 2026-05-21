class ThrowableObject extends MovableObject {
    constructor(x, y, otherDirection = false, isPoisonBubble = false) {
      super();
      if (isPoisonBubble) {
        this.loadImage(
          "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
        );
      } else {
        this.loadImage(
          "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"
        );
      }
      
      this.isPoisonBubble = isPoisonBubble;
  
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 50;
      this.otherDirection = otherDirection;
      this.speedX = otherDirection ? -10 : 10;
  
      this.throw();
    }
  
    throw() {
      setInterval(() => {
        this.x += this.speedX;
      }, 1000 / 60);
    }
  }