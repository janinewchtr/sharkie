class Level {
    enemies;
    backgroundObjects;
    levelEndX;
    characterStartX;
    level_end_x = 700;  
  
    constructor({ enemies = [], backgroundObjects = [], levelEndX = 0, characterStartX = 0 }) {
      this.enemies = enemies;
      this.backgroundObjects = backgroundObjects;
      this.levelEndX = levelEndX;
      this.characterStartX = characterStartX;
    }
  }