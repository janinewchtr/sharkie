class Character extends MovableObject {
  height = 250; // Set a default height for the character
  width = 200; // Set a default width for the character
  y = 40; // Set a default y position for the character

  offset = {
    top: 100,
    right: 25,
    bottom: 50,
    left: 25,
  };
  
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

  ]

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

  world;

  currentImage = 0; // Index for the current image in the animation sequence

  constructor() {
    super();
    this.loadImage("../img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_HURT_POISONED);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.loadImages(this.IMAGES_DEAD);
  }

  start() {
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false; // Set the direction to right
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true; // Set the direction to left
      }

      if (this.world.keyboard.UP && this.y > -60) {
        this.y -= this.speed;
      }

      if (this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height) {
        this.y += this.speed;
      }

      this.world.camera_x = -this.x; // Adjust the camera position based on the character's x position
    }, 1000 / 60); // Adjust the interval for smoother movement (60 frames per second)

    setInterval(() => {
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurtPoisoned()) {
          this.playAnimation(this.IMAGES_HURT_POISONED);
        } else if (this.isHurtElectro()) {
          this.playAnimation(this.IMAGES_HURT_ELECTRO);
        } else {
          this.playAnimation(this.IMAGES_IDLE);
        }
      }, 200);
    }
}
