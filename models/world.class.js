class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
    ];


backgroundObjects = [
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 0),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 0),
];


canvas;
ctx;

constructor(canvas){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();

}

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);       //Sorgt für immer wieder erneutes Löschen damit der Character nicht doppelt ist sondern sich "bewegt"


        this.addObjectsToMap(this.backgroundObjects);    //Hier werden die Hintergrundobjekte gezeichnet 
        this.addToMap(this.character);                    //Hier wird der Character gezeichnet
        this.addObjectsToMap(this.enemies);               //Hier werden die Gegner gezeichnet

        let self = this; // Damit 'this' in der Funktion auf die World-Instanz verweist
        requestAnimationFrame(function() {
            self.draw(); // Ruft die draw-Funktion erneut auf, um eine Animation zu erzeugen
        });
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    
    }
}
