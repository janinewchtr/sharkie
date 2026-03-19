class StatusBar extends DrawableObject {
    IMAGES_LIFE = [
        'img/4. Marcadores/green/Life/0copia 3.png',
        'img/4. Marcadores/green/Life/20copia 4.png',
        'img/4. Marcadores/green/Life/40copia 3.png',
        'img/4. Marcadores/green/Life/60copia 3.png',
        'img/4. Marcadores/green/Life/80copia 3.png',
        'img/4. Marcadores/green/Life/100copia 2.png'
    ];

    IMAGES_COINS = [
        'img/4. Marcadores/green/Coin/0copia 4.png',
        'img/4. Marcadores/green/Coin/20copia 2.png',
        'img/4. Marcadores/green/Coin/40copia 4.png',
        'img/4. Marcadores/green/Coin/60copia 4.png',
        'img/4. Marcadores/green/Coin/80copia 4.png',
        'img/4. Marcadores/green/Coin/100copia 4.png'
    ];

    IMAGES_POISONED_BUBBLES = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];

    percentage = 100;
    images = [];

    constructor(type = 'life') {
        super();

        if (type === 'life') {
            this.images = this.IMAGES_LIFE;
        } else if (type === 'coin') {
            this.images = this.IMAGES_COINS;
        } else if (type === 'poison') {
            this.images = this.IMAGES_POISONED_BUBBLES;
        }

        this.loadImages(this.images);
        this.x = 20;
        this.y = 0;
        this.width = 150;
        this.height = 50;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    reducePercentage(percentage) {
        this.setPercentage(percentage);
    }

    getImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}