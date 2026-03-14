class ThrowableObject extends MovableObject{
    constructor(x, y){
        super();
        this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = x; 
        this.y = y;
        this.width = 50;
        this.height = 50; 
        this.throw();
    }

    throw(){
        this.speedX = 10;
        setInterval(() => {
            this.x += this.speedX; // Move the bubble upwards
        }, 100); 
    }
}