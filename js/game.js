let canvas;
let world;
let keyboard = new Keyboard();


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-wrapper").classList.add("game-started");
  init();
}

function toggleFullscreen() {
  let gameWrapper = document.getElementById("game-wrapper");

  if (!document.fullscreenElement) {
    gameWrapper.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function bindMobileButton(id, key) {
  let button = document.getElementById(id);

  if (!button) {
    return;
  }

  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard[key] = true;
  });

  button.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard[key] = false;
  });

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function bindMobileControls() {
  bindMobileButton("mobile-left", "LEFT");
  bindMobileButton("mobile-right", "RIGHT");
  bindMobileButton("mobile-up", "UP");
  bindMobileButton("mobile-down", "DOWN");
  bindMobileButton("mobile-bubble", "D");
  bindMobileButton("mobile-fin", "SPACE");
}

bindMobileControls();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") keyboard.RIGHT = true;
  if (e.key === "ArrowLeft") keyboard.LEFT = true;
  if (e.key === "ArrowUp") keyboard.UP = true;
  if (e.key === "ArrowDown") keyboard.DOWN = true;
  if (e.key === " ") keyboard.SPACE = true;
  if (e.key.toLowerCase() === "d") keyboard.D = true;
  
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") keyboard.RIGHT = false;
  if (e.key === "ArrowLeft") keyboard.LEFT = false;
  if (e.key === "ArrowUp") keyboard.UP = false;
  if (e.key === "ArrowDown") keyboard.DOWN = false;
  if (e.key === " ") keyboard.SPACE = false;
  if (e.key.toLowerCase() === "d") keyboard.D = false;
});
