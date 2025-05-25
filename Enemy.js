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

        this.patrol = [
            {direction: "left", distance: 200, wait: 3},
            {direction: "up", distance: 200, wait: 3},
            {direction: "right", distance: 200, wait: 2},
            {direction: "down", distance: 200, wait: 1}
        ]
        this.currentPatrol = 0
        this.isPatrolling = true;
        this.waiting = false;
        this.targetX = null;
        this.targetY = null
        this.speed = 100;

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

            const patrol = this.patrol[this.currentPatrol]
            // Patrol
           if (!this.hasStartedFollowing && this.isPatrolling && !this.waiting) {
                // Start patrol if not already heading to target
                if (this.targetX === null && this.targetY === null) {
                    if (patrol.direction === "right") {
                        this.targetX = this.pos.x + patrol.distance;
                        this.vel.x = this.speed;
                    } 
                    if (patrol.direction === "left") {
                        this.targetX = this.pos.x - patrol.distance;
                        this.vel.x = -this.speed;
                    }
                    if (patrol.direction === "up") {
                        this.targetY = this.pos.y - patrol.distance
                        this.vel.y = -this.speed
                    }
                    if (patrol.direction === "down") {
                        this.targetY = this.pos.y + patrol.distance
                        this.vel.y = this.speed
                    }
                }

                // Check if reached target
                if ((this.vel.x > 0 && this.pos.x >= this.targetX) ||
                    (this.vel.x < 0 && this.pos.x <= this.targetX) ||
                    (this.vel.y < 0 && this.pos.y <= this.targetY) ||
                    (this.vel.y > 0 && this.pos.y >= this.targetY)) {

                    this.vel.x = 0;
                    this.targetX = null;
                    this.vel.y = 0
                    this.targetY = null
                    this.waiting = true;

                    // Wait then go to next patrol point
                    setTimeout(() => {
                        this.currentPatrol = (this.currentPatrol + 1) % this.patrol.length;
                        this.waiting = false;
                    }, patrol.wait * 1000);
                }
            }

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