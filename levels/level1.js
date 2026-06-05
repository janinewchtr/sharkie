function createLevelBackgroundObjects() {
    let backgroundObjects = [];
    let segmentWidth = 920;
    let numberOfSegments = 5;
  
    let backgroundLayerImages = [
      "img/3. Background/Layers/5. Water/D.png",
      "img/3. Background/Layers/4.Fondo 2/D.png",
      "img/3. Background/Layers/3.Fondo 1/D.png",
      "img/3. Background/Legacy/Layers/1. Light/3.png",
      "img/3. Background/Layers/2. Floor/D.png",
    ];
  
    for (let segmentIndex = 0; segmentIndex < numberOfSegments; segmentIndex++) {
      backgroundLayerImages.forEach((image) => {
        backgroundObjects.push(
          new BackgroundObject(image, segmentIndex * segmentWidth)
        );
      });
    }
  
    return backgroundObjects;
  }

  function createLevelEnemies(levelWidth) {
    let enemies = [
      new PufferFish(700, 250),
      new PufferFish(1300, 200),
      new PufferFish(1900, 300),
      new PufferFish(2600, 220),
  
      new JellyFish(1000, 80),
      new JellyFish(2100, 120),
      new JellyFish(3200, 100),
    ];
  
    let endboss = new Endboss();
    endboss.x = levelWidth - 500;
    endboss.y = -200;
    enemies.push(endboss);
  
    return enemies;
  }

  function createLevelPoisonBottles() {
    return [
      new Poison(600, 250),
      new Poison(1500, 180),
      new Poison(2300, 280),
      new Poison(3100, 150),
      new Poison(3700, 220),
    ];
  }

  function createCoinArc(startX, startY, amount, spacing, height) {
    let coins = [];
  
    for (let i = 0; i < amount; i++) {
      let x = startX + i * spacing;
      let y = startY - Math.sin((i / (amount - 1)) * Math.PI) * height;
  
      coins.push(new Coin(x, y));
    }
  
    return coins;
  }


function createLevelCoins() {
  let coins = [];

  coins = coins.concat(createCoinArc(400, 300, 7, 60, 120));
  coins = coins.concat(createCoinArc(1400, 280, 6, 60, 100));
  coins = coins.concat(createCoinArc(2400, 260, 8, 60, 140));
  coins = coins.concat(createCoinArc(3300, 300, 5, 60, 80));

  return coins;
}

  function getLevelWidth() {
    return 5 * 920;
  }

  