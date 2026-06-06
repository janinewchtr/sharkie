/**
 * Creates all background layers for the level.
 * @returns {BackgroundObject[]} All background objects of the level.
 */
function createLevelBackgroundObjects() {
    let backgroundObjects = [];
    let segmentWidth = 920;
    let numberOfSegments = 5;
    let backgroundLayerImages = IMAGE_PATHS.background;
    for (let segmentIndex = 0; segmentIndex < numberOfSegments; segmentIndex++) {
      backgroundLayerImages.forEach((image) => {
        backgroundObjects.push(
          new BackgroundObject(image, segmentIndex * segmentWidth)
        );
      });
    }
    return backgroundObjects;
  }
  
  /**
   * Creates all enemies and places the endboss at the end of the level.
   * @param {number} levelWidth - Total width of the level.
   * @returns {MovableObject[]} All enemies of the level.
   */
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
  
  /**
   * Creates all poison bottles of the level.
   * @returns {Poison[]} All poison bottles of the level.
   */
  function createLevelPoisonBottles() {
    return [
      new Poison(600, 250),
      new Poison(1500, 180),
      new Poison(2300, 280),
      new Poison(3100, 150),
      new Poison(3700, 220),
    ];
  }
  
  /**
   * Creates coins arranged in an arc.
   * @param {number} startX - Horizontal starting position.
   * @param {number} startY - Vertical starting position.
   * @param {number} amount - Number of coins in the arc.
   * @param {number} spacing - Distance between the coins.
   * @param {number} height - Height of the coin arc.
   * @returns {Coin[]} Coins belonging to the created arc.
   */
  function createCoinArc(startX, startY, amount, spacing, height) {
    let coins = [];
    for (let i = 0; i < amount; i++) {
      let x = startX + i * spacing;
      let y = startY - Math.sin((i / (amount - 1)) * Math.PI) * height;
  
      coins.push(new Coin(x, y));
    }
    return coins;
  }
  
  /**
   * Creates all coin arcs of the level.
   * @returns {Coin[]} All coins of the level.
   */
  function createLevelCoins() {
    let coins = [];
    coins = coins.concat(createCoinArc(400, 300, 7, 60, 120));
    coins = coins.concat(createCoinArc(1400, 280, 6, 60, 100));
    coins = coins.concat(createCoinArc(2400, 260, 8, 60, 140));
    coins = coins.concat(createCoinArc(3300, 300, 5, 60, 80));
    return coins;
  }
  
  /**
   * Returns the total width of the level.
   * @returns {number} Width of the level in pixels.
   */
  function getLevelWidth() {
    return 5 * 920;
  }

  