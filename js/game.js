let canvas;
let world;

function init(){
    canvas = document.getElementById('canvas');             // Holt das <canvas>-Element aus dem HTML-Dokument
    world = new World(canvas);
}