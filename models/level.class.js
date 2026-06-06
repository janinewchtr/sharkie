/**
 * Represents a level and stores its enemies, backgrounds and positions.
 */
class Level {
  enemies;
  backgroundObjects;
  levelEndX;
  characterStartX;

  /**
   * Creates a new level.
   * @param {Object} levelData - Configuration values of the level.
   * @param {MovableObject[]} levelData.enemies - Enemies inside the level.
   * @param {BackgroundObject[]} levelData.backgroundObjects - Background objects.
   * @param {number} levelData.levelEndX - Horizontal end position of the level.
   * @param {number} levelData.characterStartX - Starting position of Sharkie.
   */
  constructor({
    enemies = [],
    backgroundObjects = [],
    levelEndX = 0,
    characterStartX = 0,
  }) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.levelEndX = levelEndX;
    this.characterStartX = characterStartX;
  }
}