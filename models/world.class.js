class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
    ];


backgroundObjects = [
    new BackgroundObject('img/3. Background/Layers/2. Floor/D.png'),
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

        this.addToMap(this.character);                    //Hier wird der Character gezeichnet
        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });



        let self = this;                              //This wird innerhalb der Funktion nicht mehr erkannt, weshalb man mit let self dann das this ersatzweise erstellt - draw() wird immer wieder ausgeführt
        requestAnimationFrame(function(){
            self.draw();                               //sorgt im Prinzip dafür, dass die Animation nach dem "malen" geladen wird
        });

        this.backgroundObjects.forEach(bgObject => {
            this.addToMap(bgObject);
        });

    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    
    }
}
