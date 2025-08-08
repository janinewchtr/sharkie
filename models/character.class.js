class Character extends MovableObject {

    height = 200; // Set a default height for the character
    width = 200; // Set a default width for the character
    y = 150; // Set a default y position for the character

    constructor(){
        super();
        this.loadImage('../img/1.Sharkie/1.IDLE/1.png');
    }
    jump(){

    }
}