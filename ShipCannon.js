var CANNON_COOLDOWN = 20;

class ShipCannon {
    constructor(OwnerShip) {
        this.OwnerShip = OwnerShip;
        
        this.Cooldown = CANNON_COOLDOWN;
        this.shotImage = document.getElementById("shot");
    }
    
    Shoot(gameTime, gameObjetManager) {
        if(this.Cooldown === 0) {
            let newParticle = new Particle(this.X, this.Y, "Red", 3,7,8,0.15,1.5*Math.PI,false,gameTime,this.shotImage);

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

        this.X  = this.OwnerShip.X + this.OwnerShip.Width / 2;
        this.Y = this.OwnerShip.Y;
    }
}