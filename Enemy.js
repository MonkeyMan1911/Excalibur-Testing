import * as ex from 'excalibur';
import { Bullet } from "./Bullet.js"

class Enemy extends ex.Actor {
    constructor(name, health, target) {
        super({
            x: 500,
            y: 100,
            width: 64,
            height: 64,
            color: ex.Color.Green
        }) 

        this.health = health
        this.name = name
        this.target = target

        this.fireCooldown = 0
    }

    onInitialize(engine) {
        this.hasStartedFollowing = false

        this.healthLabel = new ex.Label({
            text: String(this.health),
            pos: ex.vec(this.pos.x - 10, this.pos.y + 40),
            font: new ex.Font({
                family: 'Arial',
                size: 24,
                unit: ex.FontUnit.Px
            }),
            color: ex.Color.White
        });
        engine.add(this.healthLabel)

        this.on("preupdate", () => {
            this.healthLabel.pos = ex.vec(this.pos.x - 10, this.pos.y + 40);
            this.healthLabel.text = String(this.health)

            const distance = this.pos.distance(this.target.pos);
            const direction = this.target.pos.sub(this.pos).normalize();

            if (Math.round(direction.x) === -1) {
                this.direction = "left"
            }
            else if (Math.round(direction.x) === 1) {
                this.direction = "right"
            }
            else if (Math.round(direction.y) === 1) {
                this.direction = "down"
            }
            else if (Math.round(direction.y) === -1) {
                this.direction = "up"
            }

            if (distance <= 300 && !this.changeStarted && !this.hasStartedFollowing) {
                this.changeStarted = true

                setTimeout(() => {
                    this.graphics.use(new ex.Rectangle({
                        height: 32,
                        width: 32,
                        color: ex.Color.Yellow
                    }))
                }, 0)
                setTimeout(() => {
                    this.graphics.use(new ex.Rectangle({
                        height: 32,
                        width: 32,
                        color: ex.Color.Red
                    }))
                    setTimeout(() => {
                        this.actions.follow(this.target, 100)
                        this.hasStartedFollowing = true
                    }, 1000)
                }, 2000)
            }
            if (distance <= 200 && !this.hasStartedFollowing) {
                setTimeout(() => {
                    this.graphics.use(new ex.Rectangle({
                        height: 32,
                        width: 32,
                        color: ex.Color.Red
                    }))
                }, 0)
                setTimeout(() => {
                    this.actions.follow(this.target, 100)
                    this.hasStartedFollowing = true
                }, 1000)
            }

            if (this.hasStartedFollowing === true && this.fireCooldown === 0 && distance <= 200) {
                const bullet = new Bullet(this, "EnemyBullet", 10)
                engine.add(bullet)
                this.fireCooldown = 1.5
                setTimeout(() => {this.fireCooldown = 0}, this.fireCooldown * 1000)
            }

            if (distance > 350 && this.hasStartedFollowing === true || distance <= 100 && this.hasStartedFollowing === true) {
                this.actions.clearActions()
                this.hasStartedFollowing = false
                this.changeStarted = false
            }
            if (distance >= 300) {
                this.changeStarted = false
                this.graphics.use(new ex.Rectangle({
                        height: 32,
                        width: 32,
                        color: ex.Color.Green
                }))
            }
        })

        this.on("collisionstart", (event) => {
            if (event.other.owner.name === "PlayerBullet") {
                this.health -= 1
                this.graphics.use(new ex.Rectangle({
                    height: 32,
                    width: 32,
                    color: ex.Color.White
                }))
                setTimeout(() => {
                    this.graphics.use(new ex.Rectangle({
                        height: 32,
                        width: 32,
                        color: ex.Color.Green
                    }))
                }, 200)
                if (!this.hasStartedFollowing) {
                    this.actions.follow(this.target, 100)
                    this.hasStartedFollowing = true
                }
            }
            if (this.health <= 0) {
                this.kill()
                engine.remove(this.healthLabel)
            }
        })
    }
}

export {Enemy}