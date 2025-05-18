import * as ex from 'excalibur';

class Bullet extends ex.Actor {
    constructor(player, name, speed) {
        super({
            x: player.pos.x,
            y: player.pos.y,
            height: 16,
            width: 25,
            color: ex.Color.Yellow
        }) 
        this.distanceRemaining = 300
        this.direction = player.direction
        this.name = name
        this.speed = speed
        if (this.direction === "up" || this.direction === "down") {
            this.graphics.use(new ex.Rectangle({
                width: 16,
                height: 25,
                color: ex.Color.Yellow
            }))
        }
    }

    onInitialize(engine) {
        this.on("preupdate", () => {
            if (this.direction === "right") {
                if (this.distanceRemaining > 0) {
                    this.pos.x += this.speed
                    this.distanceRemaining -= this.speed
                }
            }
            if (this.direction === "left") {
                if (this.distanceRemaining > 0) {
                    this.pos.x -= this.speed
                    this.distanceRemaining -= this.speed
                }
            }
            if (this.direction === "up") {
                if (this.distanceRemaining > 0) {
                    this.pos.y -= this.speed
                    this.distanceRemaining -= this.speed
                }
            }
            if (this.direction === "down") {
                if (this.distanceRemaining > 0) {
                    this.pos.y += this.speed
                    this.distanceRemaining -= this.speed
                }
            }            
            if (this.distanceRemaining <= 0) {
                this.kill()
            }
        })

        this.on("collisionstart", (event) => {
            if (this.name === "PlayerBullet" && event.other.owner.name !== "Player") {
                this.kill()
            }
            if (this.name.includes("Bullet") && event.other.owner.name.includes("Bullet")) {
                this.kill()
            }
        })
    }
}

export { Bullet }