class World {
    canvas;
    ctx;
    keyboard;

    character;
    enemies;
    backgroundObjects;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        // Objekte erst hier erzeugen (saubere Initialisierungs-Reihenfolge)
        this.character = new Character();

        this.enemies = [
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
        ];

        this.backgroundObjects = [
            new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0),
            new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/3.png', 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 0),
        ];

        // Erst world setzen, dann erst Animation/Movement starten, dann rendern
        this.setWorld();
        this.character.start();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}