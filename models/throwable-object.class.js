class ThrowableObject extends MovableObject{
    constructor(){
        super();
        this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = 50; 
        this.y = 50;
        this.width = 50;
        this.height = 50; 
        this.speedY = 10; 
        this.gravity = 0.5; 
    }
}