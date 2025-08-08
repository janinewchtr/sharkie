class MovableObject {
    x = 0;
    y = 250;
    img;
    height = 100; // Set a default height for the movable object
    width = 100;
    imageCache = {}; // Array to hold available images for the object

    loadImage(path){
        this.img = new Image();      //Abbild von dem img tag <img>
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; // Store the loaded image in the cache
        });
    }
    

    moveRight() {
        console.log('moving right');
    }

    moveLeft(){
        
    }
}