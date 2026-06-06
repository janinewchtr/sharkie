/**
 * Stores all image paths used by the game.
 */
const IMAGE_PATHS = {
    character: {
      start: "img/1.Sharkie/1.IDLE/1.png",
  
      idle: [
        "img/1.Sharkie/1.IDLE/2.png",
        "img/1.Sharkie/1.IDLE/3.png",
        "img/1.Sharkie/1.IDLE/4.png",
        "img/1.Sharkie/1.IDLE/5.png",
        "img/1.Sharkie/1.IDLE/6.png",
        "img/1.Sharkie/1.IDLE/7.png",
        "img/1.Sharkie/1.IDLE/8.png",
        "img/1.Sharkie/1.IDLE/9.png",
        "img/1.Sharkie/1.IDLE/10.png",
        "img/1.Sharkie/1.IDLE/11.png",
        "img/1.Sharkie/1.IDLE/12.png",
        "img/1.Sharkie/1.IDLE/13.png",
        "img/1.Sharkie/1.IDLE/14.png",
        "img/1.Sharkie/1.IDLE/15.png",
        "img/1.Sharkie/1.IDLE/16.png",
        "img/1.Sharkie/1.IDLE/17.png",
        "img/1.Sharkie/1.IDLE/18.png",
      ],
  
      longIdle: [
        "img/1.Sharkie/2.Long_IDLE/i1.png",
        "img/1.Sharkie/2.Long_IDLE/I2.png",
        "img/1.Sharkie/2.Long_IDLE/I3.png",
        "img/1.Sharkie/2.Long_IDLE/I4.png",
        "img/1.Sharkie/2.Long_IDLE/I5.png",
        "img/1.Sharkie/2.Long_IDLE/I6.png",
        "img/1.Sharkie/2.Long_IDLE/I7.png",
        "img/1.Sharkie/2.Long_IDLE/I8.png",
        "img/1.Sharkie/2.Long_IDLE/I9.png",
        "img/1.Sharkie/2.Long_IDLE/I10.png",
        "img/1.Sharkie/2.Long_IDLE/I11.png",
        "img/1.Sharkie/2.Long_IDLE/I12.png",
        "img/1.Sharkie/2.Long_IDLE/I13.png",
        "img/1.Sharkie/2.Long_IDLE/I14.png",
      ],
  
      swim: [
        "img/1.Sharkie/3.Swim/1.png",
        "img/1.Sharkie/3.Swim/2.png",
        "img/1.Sharkie/3.Swim/3.png",
        "img/1.Sharkie/3.Swim/4.png",
        "img/1.Sharkie/3.Swim/5.png",
        "img/1.Sharkie/3.Swim/6.png",
      ],
  
      hurtPoisoned: [
        "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
      ],
  
      hurtElectro: [
        "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
        "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
        "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
      ],
  
      dead: [
        "img/1.Sharkie/6.dead/1.Poisoned/1.png",
        "img/1.Sharkie/6.dead/1.Poisoned/2.png",
        "img/1.Sharkie/6.dead/1.Poisoned/3.png",
        "img/1.Sharkie/6.dead/1.Poisoned/4.png",
        "img/1.Sharkie/6.dead/1.Poisoned/5.png",
        "img/1.Sharkie/6.dead/1.Poisoned/6.png",
        "img/1.Sharkie/6.dead/1.Poisoned/7.png",
        "img/1.Sharkie/6.dead/1.Poisoned/8.png",
        "img/1.Sharkie/6.dead/1.Poisoned/9.png",
        "img/1.Sharkie/6.dead/1.Poisoned/10.png",
        "img/1.Sharkie/6.dead/1.Poisoned/11.png",
        "img/1.Sharkie/6.dead/1.Poisoned/12.png",
      ],
  
      bubbleAttack: [
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
      ],
  
      finSlap: [
        "img/1.Sharkie/4.Attack/Fin slap/1.png",
        "img/1.Sharkie/4.Attack/Fin slap/2.png",
        "img/1.Sharkie/4.Attack/Fin slap/3.png",
        "img/1.Sharkie/4.Attack/Fin slap/4.png",
        "img/1.Sharkie/4.Attack/Fin slap/5.png",
        "img/1.Sharkie/4.Attack/Fin slap/6.png",
        "img/1.Sharkie/4.Attack/Fin slap/7.png",
        "img/1.Sharkie/4.Attack/Fin slap/8.png",
      ],
  
      whaleAttack: [
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
      ],
    },
  
    endboss: {
      floating: [
        "img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "img/2.Enemy/3 Final Enemy/2.floating/13.png",
      ],
  
      introduce: [
        "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
      ],
  
      attack: [
        "img/2.Enemy/3 Final Enemy/Attack/1.png",
        "img/2.Enemy/3 Final Enemy/Attack/2.png",
        "img/2.Enemy/3 Final Enemy/Attack/3.png",
        "img/2.Enemy/3 Final Enemy/Attack/4.png",
        "img/2.Enemy/3 Final Enemy/Attack/5.png",
        "img/2.Enemy/3 Final Enemy/Attack/6.png",
      ],
  
      hurt: [
        "img/2.Enemy/3 Final Enemy/Hurt/1.png",
        "img/2.Enemy/3 Final Enemy/Hurt/2.png",
        "img/2.Enemy/3 Final Enemy/Hurt/3.png",
        "img/2.Enemy/3 Final Enemy/Hurt/4.png",
      ],
  
      dead: [
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
      ],
    },
  
    pufferFish: {
      swim: [
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
      ],
  
      transition: [
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
      ],
  
      dead: [
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
      ],
    },
  
    jellyFish: {
      idle: [
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
      ],
  
      dead: [
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
      ],
    },
  
    coin: [
      "img/4. Marcadores/1. Coins/1.png",
      "img/4. Marcadores/1. Coins/2.png",
      "img/4. Marcadores/1. Coins/3.png",
      "img/4. Marcadores/1. Coins/4.png",
    ],
  
    poison: [
      "img/4. Marcadores/Posi¢n/Animada/1.png",
      "img/4. Marcadores/Posi¢n/Animada/2.png",
      "img/4. Marcadores/Posi¢n/Animada/3.png",
      "img/4. Marcadores/Posi¢n/Animada/4.png",
      "img/4. Marcadores/Posi¢n/Animada/5.png",
      "img/4. Marcadores/Posi¢n/Animada/6.png",
      "img/4. Marcadores/Posi¢n/Animada/7.png",
      "img/4. Marcadores/Posi¢n/Animada/8.png",
    ],
  
    bubbles: {
      normal: "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png",
      poison:
        "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
    },
  
    statusBar: {
      life: [
        "img/4. Marcadores/green/Life/0copia 3.png",
        "img/4. Marcadores/green/Life/20copia 4.png",
        "img/4. Marcadores/green/Life/40copia 3.png",
        "img/4. Marcadores/green/Life/60copia 3.png",
        "img/4. Marcadores/green/Life/80copia 3.png",
        "img/4. Marcadores/green/Life/100copia 2.png",
      ],
  
      coins: [
        "img/4. Marcadores/green/Coin/0copia 4.png",
        "img/4. Marcadores/green/Coin/20copia 2.png",
        "img/4. Marcadores/green/Coin/40copia 4.png",
        "img/4. Marcadores/green/Coin/60copia 4.png",
        "img/4. Marcadores/green/Coin/80copia 4.png",
        "img/4. Marcadores/green/Coin/100copia 4.png",
      ],
  
      poison: [
        "img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
        "img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
        "img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
        "img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
        "img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
        "img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
      ],
    },
  
    background: [
      "img/3. Background/Layers/5. Water/D.png",
      "img/3. Background/Layers/4.Fondo 2/D.png",
      "img/3. Background/Layers/3.Fondo 1/D.png",
      "img/3. Background/Legacy/Layers/1. Light/3.png",
      "img/3. Background/Layers/2. Floor/D.png",
    ],
  };