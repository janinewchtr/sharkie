class MovableObject {
    x = 120;
    y = 150;
    img;
    height = 200;
    width = 100;

    loadImage(path){
        this.img = new Image();      //Abbild von dem img tag <img>
        this.img.src = path;
    }
    

    moveRight() {
        console.log('moving right');
    }

    moveLeft(){
        
    }
}