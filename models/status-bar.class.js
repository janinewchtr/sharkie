class StatusBar {

    IMAGES_LIFE = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_  copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'
    ];

    percentage = 100;

    constructor() {
        this.loadImage(this.IMAGES_LIFE[5]);
        this.loadImages(this.IMAGES_LIFE);
    }

    reducePercentage(amount) {
        this.percentage -= amount;
        if (this.percentage < 0) {
            this.percentage = 0;
        }
        this.updateImage();
    }
}