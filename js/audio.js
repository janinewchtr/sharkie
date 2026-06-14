/**
 * Controls the background music and game sound effects.
 */
class AudioManager {
  mainMusic = new Audio("audio/kallydru-ocean-stillness-407237.mp3");
  bossMusic = new Audio(
    "audio/sonican-hyper-adventure-action-chase-loop-338444.mp3"
  );
  swimSound = new Audio("audio/49053354-swim-307502.mp3");
  bubbleSound = new Audio("audio/universfield-bubble-pop-06-351337.mp3");
  slapSound = new Audio(
    "audio/freesound_community-clean-fast-swooshaiff-14784.mp3"
  );
  hurtSound = new Audio("audio/ough-47202.mp3");
  electricHurtSound = new Audio("audio/electric-shock-33018.mp3");
  coinCollectSound = new Audio("audio/liecio-collect-points-190037.mp3");
  poisonCollectSound = new Audio("audio/collect_poison.mp3");

  currentMusic = null;

  /**
   * Creates and configures the audio manager.
   */
  constructor() {
    this.configureMusic(this.mainMusic, 0.25);
    this.configureMusic(this.bossMusic, 0.35);
    this.swimSound.volume = 0.15;
    this.bubbleSound.volume = 0.35;
    this.slapSound.volume = 0.4;
    this.hurtSound.volume = 0.5;
    this.electricHurtSound.volume = 0.4;
    this.coinCollectSound.volume = 0.45;
    this.poisonCollectSound.volume = 0.45;
  }

  /**
   * Configures a background music track.
   * @param {HTMLAudioElement} music - Music track being configured.
   * @param {number} volume - Playback volume between zero and one.
   */
  configureMusic(music, volume) {
    music.loop = true;
    music.volume = volume;
  }

  /**
   * Plays the main background music.
   */
  playMainMusic() {
    this.playMusic(this.mainMusic);
  }

  /**
   * Plays the endboss music.
   */
  playBossMusic() {
    this.playMusic(this.bossMusic);
  }

  /**
   * Changes the currently playing background music.
   * @param {HTMLAudioElement} music - Music track being played.
   */
  playMusic(music) {
    if (this.currentMusic === music && !music.paused) {
      return;
    }

    this.stopMusic();
    this.currentMusic = music;
    music.play().catch(() => {});
  }

  /**
   * Stops and resets the currently playing background music.
   */
  stopMusic() {
    if (!this.currentMusic) {
      return;
    }

    this.currentMusic.pause();
    this.currentMusic.currentTime = 0;
    this.currentMusic = null;
  }

  /**
   * Starts the swimming sound while Sharkie is moving.
   */
  playSwimSound() {
    if (this.swimSound.paused) {
      this.swimSound.loop = true;
      this.swimSound.play().catch(() => {});
    }
  }

  /**
   * Stops the swimming sound when Sharkie stops moving.
   */
  stopSwimSound() {
    this.swimSound.pause();
    this.swimSound.currentTime = 0;
  }

  /**
   * Plays the bubble attack sound.
   */
  playBubbleSound() {
    this.playEffect(this.bubbleSound);
  }

  /**
   * Plays the fin-slap sound.
   */
  playSlapSound() {
    this.playEffect(this.slapSound);
  }

  /**
   * Plays the matching sound for the received damage type.
   * @param {string} type - Type of damage Sharkie received.
   */
  playHurtSound(type) {
    if (type === "electro") {
      this.playEffect(this.electricHurtSound);
    } else {
      this.playEffect(this.hurtSound);
    }
  }

  /**
 * Plays the coin collection sound.
 */
playCoinCollectSound() {
    this.playEffect(this.coinCollectSound);
  }
  
  /**
   * Plays the poison bottle collection sound.
   */
  playPoisonCollectSound() {
    this.playEffect(this.poisonCollectSound);
  }

  /**
   * Plays a copy of a sound effect.
   * @param {HTMLAudioElement} sound - Sound effect being played.
   */
  playEffect(sound) {
    let effect = sound.cloneNode();
    effect.volume = sound.volume;
    effect.play().catch(() => {});
  }
}

const audioManager = new AudioManager();
