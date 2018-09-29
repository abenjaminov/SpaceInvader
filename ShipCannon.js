var CANNON_COOLDOWN = 20;
var DefaultAngles = {
    Down : 0.5*Math.PI,
    Up : 1.5*Math.PI
}

class ShipCannon {
    constructor(Owner, DefaultAngle = DefaultAngles.Down, Target) {
        this.DefaultAngle = DefaultAngle;
        this.Owner = Owner;
        this.Target = Target;
        
        this.Cooldown = CANNON_COOLDOWN;
        this.shotImage = document.getElementById("shot");
    }
    
    Shoot(gameTime, gameObjetManager) {
        if(this.Cooldown === 0) {
            var Angle = this.DefaultAngle;

            if(this.Target) {
                Angle = GetDirectionToPoint(Target.GetPoint(), {X : this.X, Y: this.Y});
            }

            let newParticle = new Particle(this.X, this.Y, "Red", 3,7,8,0.15,Angle,false,gameTime,this.shotImage);

            this.Cooldown = CANNON_COOLDOWN;
            gameObjetManager.AddShipShot(newParticle)
        }
    }

    Draw(Context) {
        
    }

    Update(gameTime) {
        if(this.Cooldown > 0) {
            this.Cooldown--;
        }

        this.X  = this.Owner.X + this.Owner.Width / 2;
        this.Y = this.Owner.Y;
    }
}