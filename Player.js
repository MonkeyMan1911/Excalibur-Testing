import * as ex from 'excalibur';
import { Bullet } from "./Bullet.js"

class Player extends ex.Actor {
    constructor(spriteSheet) {
        super({
            x: 100,
            y: 100,
            width: 18,
            height: 25,
            color: ex.Color.Red,    
        });

        this.canMove = {left: true, right: true, down: true, up: true}

        this.downAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [0, 1, 2, 3], 200);
        this.rightAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [4, 5, 6, 7], 200);
        this.upAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [8, 9, 10, 11], 200);
        this.leftAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [12, 13, 14, 15], 200);

        this.idleSprite = spriteSheet.getSprite(0, 0); // First frame of down animation
        this.idleSprites = {down: spriteSheet.getSprite(0, 0), 
                            right: spriteSheet.getSprite(0, 1), 
                            up: spriteSheet.getSprite(0, 2), 
                            left: spriteSheet.getSprite(0, 3)}
        this.direction = "down"

        this.fireCooldown = 0
        this.health = 5
        this.speed = 200

        this.name = "Player"
    }
    
    onInitialize(engine) {
        this.scale.x = 3
        this.scale.y = 3
        this.playerLabel = new ex.Label({
            text: String(this.health),
            pos: ex.vec(this.pos.x - 10, this.pos.y + 40),
            font: new ex.Font({
                family: 'Arial',
                size: 24,
                unit: ex.FontUnit.Px
            }),
            color: ex.Color.White
        });
        engine.add(this.playerLabel)

        document.body.requestPointerLock()

        this.on('preupdate', () => {
            let moving = false
            this.playerLabel.pos = ex.vec(this.pos.x - 10, this.pos.y + 40);
            this.playerLabel.text = String(this.health)

            const gamepad = engine.input.gamepads.at(1);
            const leftX = gamepad?.getAxes(ex.Axes.LeftStickX) ?? 0;
            const leftY = gamepad?.getAxes(ex.Axes.LeftStickY) ?? 0;
            const rightX = gamepad?.getAxes(ex.Axes.RightStickX) ?? 0;
            const rightY = gamepad?.getAxes(ex.Axes.RightStickY) ?? 0;

            const rightHeld = engine.input.keyboard.isHeld(ex.Keys.Right) || leftX > 0.5;
            const leftHeld  = engine.input.keyboard.isHeld(ex.Keys.Left)  || leftX < -0.5;
            const upHeld    = engine.input.keyboard.isHeld(ex.Keys.Up)    || leftY < -0.5;
            const downHeld  = engine.input.keyboard.isHeld(ex.Keys.Down)  || leftY > 0.5;
            
            if (rightX > 0.5) {
                this.direction = "right"
            }
            if (rightX < -0.5) {
                this.direction = "left"
            }
            if (rightY > 0.5) {
                this.direction = "down"
            }
            if (rightY < -0.5) {
                this.direction = "up"
            }

            if (rightHeld) {
                if (this.canMove.right) {
                    this.vel.x = this.speed
                    this.vel.y = 0
                    this.graphics.use(this.rightAnimation)
                    moving = true
                }
                else {
                    this.vel.x = 0
                }
                this.direction = "right"
            }
            else if (leftHeld) {
                if (this.canMove.left) {
                    this.vel.x = -this.speed
                    this.vel.y = 0
                    this.graphics.use(this.leftAnimation)
                    moving = true
                }
                else {
                    this.vel.x = 0
                }
                this.direction = "left"
            }
            else if (upHeld) {
                if (this.canMove.up) {
                    this.vel.y = -this.speed
                    this.vel.x = 0
                    this.graphics.use(this.upAnimation)
                    moving = true
                }
                else {
                    this.vel.y = 0
                }
                this.direction = "up"
            }
            else if (downHeld) {
                if (this.canMove.down) {
                    this.vel.y = this.speed
                    this.vel.x = 0
                    this.graphics.use(this.downAnimation)
                    moving = true
                }
                else {
                    this.vel.y = 0
                }
                this.direction = "down"
            }   
            
            if (!upHeld && !downHeld && !leftHeld && !rightHeld) {
                this.vel.y = 0
                this.vel.x = 0
                moving = false
            } 

            if (!moving) {
                this.graphics.use(this.idleSprites[this.direction])
            }
            if (moving) {
                document.body.requestPointerLock()
            }

            engine.input.keyboard.on('down', (evt) => {
                if (evt.key === ex.Keys.Space) {
                }
            });
            engine.input.keyboard.on('up', (evt) => {
                if (evt.key === ex.Keys.Space && this.fireCooldown === 0 ) {
                    const bullet = new Bullet(this, "PlayerBullet", 5)
                    engine.add(bullet)
                    this.fireCooldown = 2
                    setTimeout(() => {this.fireCooldown = 0}, this.fireCooldown * 1000)
                }
            });

        })
        this.on('collisionstart', (event) => {
            const collisionCoords = event.contact.normal
            if (collisionCoords.x === -1) {
                this.canMove.right = false
            }
            if (collisionCoords.x === 1) {
                this.canMove.left = false
            }
            if (collisionCoords.y === -1) {
                this.canMove.down = false
            }
            if (collisionCoords.y === 1) {
                this.canMove.up = false
            }

            if (event.other.owner.name === "EnemyBullet") {
                this.health -= 1
                this.actions.blink(150, 150, 3)
            }
            if (this.health <= 0) {
                this.kill()
                engine.remove(this.playerLabel)
            }
        })
        this.on('collisionend', () => {
            Object.keys(this.canMove).forEach(key => {
                this.canMove[key] = true
            })
        })
    }
}

export {Player}