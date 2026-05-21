class Endboss extends MovableObject {

        height = 600; // Set a default height for the endboss
        width = 500; // Set a default width for the endboss
        y = -140; // Set a default y position for the endboss

        energy = 100;
        lastHit = 0;
        isDeadEndboss = false;
        deadAnimationIndex = 0;
        deadAnimationFinished = false;


    IMAGES_IDLE = [
        "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
    ];

    IMAGES_FLOATING = [

        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ];

    hadFirstContact = false; // Flag to track if the endboss has had first contact with the character


    constructor(){
        super().loadImage('img/2.Enemy/3 Final Enemy/2.floating/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4000; // Start position of the endboss
        this.animate(); // Start the animation of the endboss   
    }

    
    animate() {
        let i = 0;
      
        setInterval(() => {
            if (this.isDead()) {
                this.playDeathAnimationOnce();
                this.y -= 3;
                return;
              }
      
          if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            return;
          }
      
          if (i < 10) {
            this.playAnimation(this.IMAGES_IDLE);
          } else {
            this.playAnimation(this.IMAGES_FLOATING);
          }
      
          i++;
      
          if (this.world && this.world.character.x > 4000 && !this.hadFirstContact) {
            i = 0;
            this.hadFirstContact = true;
          }
        }, 150);
      }

      
      hit(type) {
        let now = Date.now();
      
        if (now - this.lastHit < 600) {
          return;
        }
      
        this.lastHit = now;
      
        if (type === "poison") {
          this.energy -= 20;
        } else {
          this.energy -= 5;
        }
      
        if (this.energy <= 0) {
          this.energy = 0;
          this.isDeadEndboss = true;
        }
      }

          isHurt() {
            return Date.now() - this.lastHit < 600 && !this.isDead();
          }

          playDeathAnimationOnce() {
            if (!this.deadAnimationFinished) {
              let path = this.IMAGES_DEAD[this.deadAnimationIndex];
              this.img = this.imageCache[path];
          
              this.deadAnimationIndex++;
          
              if (this.deadAnimationIndex >= this.IMAGES_DEAD.length) {
                this.deadAnimationIndex = this.IMAGES_DEAD.length - 1;
                this.deadAnimationFinished = true;
              }
            }
          }
}

