import * as ex from 'excalibur';

class Weapon extends ex.Actor {
    constructor(player, direction, name) {
        super({
            x: player.pos.x,
            y: player.pos.y,
            width: 24,
            height: 64,
            color: ex.Color.DarkGray
        }) 
    }
}

