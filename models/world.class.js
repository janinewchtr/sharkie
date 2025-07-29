class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
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
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });


        let self = this;                              //This wird innerhalb der Funktion nicht mehr erkannt, weshalb man mit let self dann das this ersatzweise erstellt - draw() wird immer wieder ausgeführt
        requestAnimationFrame(function(){
            self.draw();                               //sorgt im Prinzip dafür, dass die Animation nach dem "malen" geladen wird
        });

    }
}