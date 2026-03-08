class Endboss extends MovableObject {
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
        this.x = 500; // Start position of the endboss
        this.y = 100; // Set a default y position for the endboss
        this.animate(); // Start the animation of the endboss   
    }

    animate() {
        setInterval(() => {
            //walk animation
            this.playAnimation(this.IMAGES_IDLE);
          }, 200); // Adjust the interval for animation speed
        }


}