class PufferFish extends MovableObject {
    height = 80; // Set a default height for the puffer fish
    width = 80; // Set a default width for the puffer fish
    y = 250; // Set a default y position for the puffer fish

    constructor(){
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png');
        this.x = 200 + Math.random()*500;
    }

}