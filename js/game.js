let canvas;
let ctx;
let world = new World();

function init(){
    canvas = document.getElementById('canvas');             // Holt das <canvas>-Element aus dem HTML-Dokument
    ctx = canvas.getContext('2d');                          // Erstellt einen 2D-Kontext – damit können wir 2D-Grafiken auf dem Canvas zeichnen

    console.log('My Character is', character)

}