import MovingObject from './moving-object';

class Player extends MovingObject{
    constructor(pos, vel, direc){
        super(pos, vel, direc);
        this.lines = [[-10, 4], [0, -22], [10, 4], [0, 0]];
    }

    is_collided(enemy){
        const maxDist = enemy.radius + 10; //max distance at which the two are not colliding, enemy's radius and cricle of radius 20 around player.
        const diffX = this.pos[0] - enemy.pos[0];
        const diffY = this.pos[1] - enemy.pos[1];
        const dist = Math.sqrt(diffX**2 + diffY**2);
        if(dist < maxDist){
            return true;
        }
        return false;
    }




    
    draw(ctx){
        ctx.fillstyle = "#dee4ed";
        ctx.save();
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(this.direc - Math.PI / 2);
        ctx.beginPath();
        this.lines.forEach(pos => {
            ctx.lineTo(pos[0], pos[1]);
        });
        ctx.fill();
        ctx.restore();
    }
}

export default Player;