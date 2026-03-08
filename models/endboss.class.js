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

    constructor(){
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.x = 800; // Start position of the endboss
        this.animate(); // Start the animation of the endboss   
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
          }, 200); // Adjust the interval for animation speed
        }
}