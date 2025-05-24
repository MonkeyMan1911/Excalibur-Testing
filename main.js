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

const testBox = new ex.Actor({
    x: 500,
    y: 300,
    width: 24,
    height: 64,
    color: ex.Color.Green
})
testBox.on('initialize', () => {
    testBox.actions.rotateTo(Math.PI / 2, Math.PI, ex.RotationType.Clockwise)
})

const player = new Player(playerSpriteSheet)
const enemy = new Enemy("Enemy", 3, player)

game.currentScene.camera.strategy.lockToActor(player);


game.input.gamepads.enabled = true;

game.input.gamepads.on('connect', (ce) => {
  const pad = ce.gamepad;
  pad.on('button', (be) => {
    if (be.button === ex.Buttons.Face1) {
      console.log("A button pressed");
    }
  });
  pad.on('axis', (ae) => {
    if (ae.axis === ex.Axes.LeftStickX && ae.value > 0.5) {
      console.log("Moving right!");
    }
  });
});

game.add(testBox)
game.add(enemy)
game.add(player);
game.start(loader);
