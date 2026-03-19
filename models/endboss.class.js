class Endboss extends MovableObject {

        height = 600; // Set a default height for the endboss
        width = 500; // Set a default width for the endboss
        y = -140; // Set a default y position for the endboss


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

    hadFirstContact = false; // Flag to track if the endboss has had first contact with the character


    constructor(){
        super().loadImage('img/2.Enemy/3 Final Enemy/2.floating/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_FLOATING);
        this.x = 4000; // Start position of the endboss
        this.animate(); // Start the animation of the endboss   
    }

    animate() {
            let i = 0;
        
            setInterval(() => {
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
}

