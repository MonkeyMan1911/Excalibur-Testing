import * as ex from 'excalibur';
import { Player } from './Player.js';
import { Enemy } from './Enemy.js';

const game = new ex.Engine({
  width: 1080,
  height: 700,
  canvasElementId: 'game',
  antialiasing: false,
  pixelArt: true
});

const playerImage = new ex.ImageSource('/images/characters/people/ResizedHero.png');
const loader = new ex.Loader([playerImage]); // Preload the image
const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
        image: playerImage,
        grid: {
            columns: 4,
            rows: 4,
            spriteWidth: 16,
            spriteHeight: 23,
        },
});

const player = new Player(playerSpriteSheet)
const enemy = new Enemy("Enemy", 3, player)

game.currentScene.camera.strategy.lockToActor(player);

game.add(enemy)
game.add(player);
game.start(loader);