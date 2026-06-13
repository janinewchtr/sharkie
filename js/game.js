let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Starts an interval and saves its ID so it can be stopped later.
 * @param {Function} fn - Function executed by the interval.
 * @param {number} time - Time between executions in milliseconds.
 * @returns {number} ID of the created interval.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

/**
 * Stops all currently running game intervals.
 */
function stopGameIntervals() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

/**
 * Finds the canvas and creates a new game world.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * Hides the start screen and starts the game.
 */
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-wrapper").classList.add("game-started");
  init();
}

/**
 * Opens or closes the fullscreen mode.
 */
function toggleFullscreen() {
  let gameWrapper = document.getElementById("game-wrapper");
  if (!document.fullscreenElement) {
    gameWrapper.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/**
 * Opens fullscreen mode when the game is started on a mobile device.
 */
function enterMobileFullscreen() {
  let isMobileDevice = window.matchMedia("(max-width: 950px)").matches;
  let gameWrapper = document.getElementById("game-wrapper");

  if (
    isMobileDevice &&
    !document.fullscreenElement &&
    gameWrapper.requestFullscreen
  ) {
    gameWrapper.requestFullscreen();
  }
}

function bindMobileButton(id, key) {
  let button = document.getElementById(id);
  if (!button) {
    return;
  }
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    keyboard[key] = true;
  });
  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    keyboard[key] = false;
  });
  button.addEventListener("pointerleave", () => {
    keyboard[key] = false;
  });
  button.addEventListener("pointercancel", () => {
    keyboard[key] = false;
  });
  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  button.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
}

/**
 * Connects all mobile control buttons with their game controls.
 */
function bindMobileControls() {
  bindMobileButton("mobile-left", "LEFT");
  bindMobileButton("mobile-right", "RIGHT");
  bindMobileButton("mobile-up", "UP");
  bindMobileButton("mobile-down", "DOWN");
  bindMobileButton("mobile-bubble", "D");
  bindMobileButton("mobile-fin", "SPACE");
}

/**
 * Connects the mobile controls after the HTML has loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
  bindMobileControls();
});

/**
 * Displays the instruction screen.
 */
function showInstructions() {
  document.getElementById("instructions-screen").style.display = "flex";
}

/**
 * Hides the instruction screen.
 */
function hideInstructions() {
  document.getElementById("instructions-screen").style.display = "none";
}

/**
 * Stops the current game and creates a new game world.
 */
function restartGame() {
  enterMobileFullscreen();
  stopCurrentWorld();
  resetKeyboard();
  hideEndScreens();
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-wrapper").classList.add("game-started");
  init();
}

/**
 * Stops the game and displays the start screen.
 */
function showStartScreen() {
  stopCurrentWorld();
  resetKeyboard();
  hideEndScreens();
  clearCanvas();

  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("game-wrapper").classList.remove("game-started");
}

/**
 * Stops the currently active game world.
 */
function stopCurrentWorld() {
  if (world && world.stop) {
    world.stop();
  }
}

function hideEndScreens() {
  document.getElementById("game-over-screen").style.display = "none";
  let youWinScreen = document.getElementById("you-win-screen");
  youWinScreen.style.display = "none";
  youWinScreen.classList.remove("show-options");
}
/**
 * Displays the restart and home options after winning.
 */
function showWinOptions() {
  let youWinScreen = document.getElementById("you-win-screen");
  if (youWinScreen) {
    youWinScreen.classList.add("show-options");
  }
}

/**
 * Resets all keyboard controls.
 */
function resetKeyboard() {
  keyboard.RIGHT = false;
  keyboard.LEFT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;
}

/**
 * Clears the canvas and draws its default background color.
 */
function clearCanvas() {
  if (!canvas) {
    canvas = document.getElementById("canvas");
  }

  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#071934";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Displays the game-over screen.
 */
function showGameOverScreen() {
  let gameOverScreen = document.getElementById("game-over-screen");
  let gameWrapper = document.getElementById("game-wrapper");
  gameWrapper.classList.remove("game-started");
  if (gameOverScreen) {
    gameOverScreen.style.display = "flex";
  }
}

/**
 * Displays the victory screen and hides the mobile controls.
 */
function showYouWinScreen() {
  let youWinScreen = document.getElementById("you-win-screen");
  let gameWrapper = document.getElementById("game-wrapper");
  gameWrapper.classList.remove("game-started");
  if (youWinScreen) {
    youWinScreen.style.display = "flex";
  }
}

/**
 * Activates keyboard controls when a supported key is pressed.
 */
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") keyboard.RIGHT = true;
  if (event.key === "ArrowLeft") keyboard.LEFT = true;
  if (event.key === "ArrowUp") keyboard.UP = true;
  if (event.key === "ArrowDown") keyboard.DOWN = true;
  if (event.key === " ") keyboard.SPACE = true;
  if (event.key.toLowerCase() === "d") keyboard.D = true;
});

/**
 * Deactivates keyboard controls when a supported key is released.
 */
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") keyboard.RIGHT = false;
  if (event.key === "ArrowLeft") keyboard.LEFT = false;
  if (event.key === "ArrowUp") keyboard.UP = false;
  if (event.key === "ArrowDown") keyboard.DOWN = false;
  if (event.key === " ") keyboard.SPACE = false;
  if (event.key.toLowerCase() === "d") keyboard.D = false;
});
