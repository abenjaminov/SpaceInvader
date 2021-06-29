var DefaultAngles = {
    Down : 0.5*Math.PI,
    Up : 1.5*Math.PI
}

var CannonFireSpeed = {
    Slow : 1,
    Medium : 2,
    Fast : 4
}

var CannonFireRate = {
    Slow : 300,
    Medium : 150,
    Fast : 30
}

class ShipCannon {
    constructor(Owner,ShotScale,CannonCooldown,fireSpeed, DefaultAngle = DefaultAngles.Down, Target) {
        this.DefaultAngle = DefaultAngle;
        this.Owner = Owner;
        this.Target = Target;
        
        this.FireSpeed = fireSpeed;
        this.CANNON_COOLDOWN_TIME = CannonCooldown;
        this.ShotScale = ShotScale;
        this.Cooldown = 0;
        this.shotImage = document.getElementById("shot");
    }
    
    Shoot(gameTime, gameObjetManager) {
        if(this.Cooldown === 0) {
            var Angle = this.DefaultAngle;

            if(this.Target) {
                Angle = GetDirectionToPoint(this.Target.GetCenterPoint(), {X : this.X, Y: this.Y});
            }

            let newParticle = new Particle(this.X, this.Y, "Red", 3 * this.ShotScale,7 * this.ShotScale,2 * this.FireSpeed  ,0.15,Angle,false,gameTime,this.Owner, this.shotImage);

            this.Cooldown = this.CANNON_COOLDOWN_TIME;
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