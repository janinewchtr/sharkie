class Character extends MovableObject {
  height = 250; // Set a default height for the character
  width = 200; // Set a default width for the character
  y = 40; // Set a default y position for the character

  offset = {
    top: 115,
    right: 40,
    bottom: 50,
    left: 25,
  };


  isSwimming = false;
  lastMove = Date.now();
  longIdleHold = 5000;
  collectedPoison = 0;
  collectedCoins = 0;
  isBubbleAttacking = false;
  bubbleAttackFrame = 0;
  bubbleAttackCounter = 0;
  bubbleAttackFrameDelay = 3;
  isFinSlap = false;
  finSlapFrame = 0;
  finSlapCounter = 0;
  finSlapFrameDelay = 3;
  
  IMAGES_IDLE = [
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_LONG_IDLE = [
    'img/1.Sharkie/2.Long_IDLE/i1.png',
    'img/1.Sharkie/2.Long_IDLE/I2.png',
    'img/1.Sharkie/2.Long_IDLE/I3.png',
    'img/1.Sharkie/2.Long_IDLE/I4.png',
    'img/1.Sharkie/2.Long_IDLE/I5.png',
    'img/1.Sharkie/2.Long_IDLE/I6.png',
    'img/1.Sharkie/2.Long_IDLE/I7.png',
    'img/1.Sharkie/2.Long_IDLE/I8.png',
    'img/1.Sharkie/2.Long_IDLE/I9.png',
    'img/1.Sharkie/2.Long_IDLE/I10.png',
    'img/1.Sharkie/2.Long_IDLE/I11.png',
    'img/1.Sharkie/2.Long_IDLE/I12.png',
    'img/1.Sharkie/2.Long_IDLE/I13.png',
    'img/1.Sharkie/2.Long_IDLE/I14.png',

  ];

  IMAGES_SWIM = [
    'img/1.Sharkie/3.Swim/1.png',
    'img/1.Sharkie/3.Swim/2.png',
    'img/1.Sharkie/3.Swim/3.png',
    'img/1.Sharkie/3.Swim/4.png',
    'img/1.Sharkie/3.Swim/5.png',
    'img/1.Sharkie/3.Swim/6.png',
  ];

  IMAGES_HURT_POISONED = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",  
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
];

IMAGES_HURT_ELECTRO = [
    "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
];

  IMAGES_DEAD = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_ATTACK = [
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
    'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
  ];

  IMAGES_FIN_SLAP = [
    'img/1.Sharkie/4.Attack/Fin slap/1.png',
    'img/1.Sharkie/4.Attack/Fin slap/2.png',
    'img/1.Sharkie/4.Attack/Fin slap/3.png',
    'img/1.Sharkie/4.Attack/Fin slap/4.png',
    'img/1.Sharkie/4.Attack/Fin slap/5.png',
    'img/1.Sharkie/4.Attack/Fin slap/6.png',
    'img/1.Sharkie/4.Attack/Fin slap/7.png',
    'img/1.Sharkie/4.Attack/Fin slap/8.png'
  ];

  world;

  currentImage = 0; // Index for the current image in the animation sequence


  constructor() {
    super();
    this.loadImage("../img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_FIN_SLAP);
    this.loadImages(this.IMAGES_HURT_POISONED);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.loadImages(this.IMAGES_DEAD);
  }

  start() {
    this.animate();
  }

  isLongIdle() {
    return Date.now() - this.lastMove > this.longIdleHold;
  }

  startBubbleAttack() {
    if (this.isBubbleAttacking) return;
  
    this.isBubbleAttacking = true;
    this.bubbleAttackFrame = 0;
  }

  startFinSlap() {
    if (this.isFinSlap) return;
  
    this.isFinSlap = true;
    this.finSlapFrame = 0;
    this.finSlapCounter = 0;
  }

  animate() {
    setInterval(() => {
      let isMoving = false;

      if (this.isBubbleAttacking) {
        let path = this.IMAGES_ATTACK[this.bubbleAttackFrame];
        this.img = this.imageCache[path];
      
        this.bubbleAttackCounter++;
      
        if (this.bubbleAttackCounter >= this.bubbleAttackFrameDelay) {
          this.bubbleAttackFrame++;
          this.bubbleAttackCounter = 0;
        }
      
        if (this.bubbleAttackFrame >= this.IMAGES_ATTACK.length) {
          this.isBubbleAttacking = false;
          this.bubbleAttackFrame = 0;
          this.bubbleAttackCounter = 0;
          this.world.createBubbleFromSharkieMouth();
        }
      
        return;
      }

      if (this.isFinSlap) {
        let path = this.IMAGES_FIN_SLAP[this.finSlapFrame];
        this.img = this.imageCache[path];
      
        this.finSlapCounter++;
      
        if (this.finSlapCounter >= this.finSlapFrameDelay) {
          this.finSlapFrame++;
          this.finSlapCounter = 0;
        }
      
        if (this.finSlapFrame >= this.IMAGES_FIN_SLAP.length) {
          this.isFinSlap = false;
          this.finSlapFrame = 0;
          this.finSlapCounter = 0;
          this.world.createFinSlapHitbox();
        }
      
        return;
      }

      if (!this.isDead()) {
        if (this.world.keyboard.RIGHT) {
          this.x += this.speed;
          this.otherDirection = false;
          isMoving = true;
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
          this.x -= this.speed;
          this.otherDirection = true;
          isMoving = true;
        }

        if (this.world.keyboard.UP && this.y > -60) {
          this.y -= this.speed;
          isMoving = true;
        }

        if (this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height) {
          this.y += this.speed;
          isMoving = true;
        }
      }

      this.isSwimming = isMoving;

      if (isMoving) {
        this.lastMove = Date.now();
      }

      this.world.camera_x = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurtElectro()) {
        this.playAnimation(this.IMAGES_HURT_ELECTRO);
      } else if (this.isHurtPoisoned()) {
        this.playAnimation(this.IMAGES_HURT_POISONED);
      } else if (this.isSwimming) {
        this.playAnimation(this.IMAGES_SWIM);
      } else if (this.isLongIdle()) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 200);
  }

  collectPoison() {
    if (this.collectedPoison < 5) {
      this.collectedPoison++;
    }
  }

  collectCoins() {
    if (this.collectedCoins < 5) {
      this.collectedCoins++;
    }
  }


}
