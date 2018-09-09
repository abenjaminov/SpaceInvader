var CANNON_COOLDOWN = 20;

class ShipCannon {
    constructor(OwnerShip) {
        this.OwnerShip = OwnerShip;
        
        this.Cooldown = CANNON_COOLDOWN;
    }
    
    Shoot(gameTime, gameObjetManager) {
        if(this.Cooldown === 0) {
            let newParticle = new Particle(this.X, this.Y, "Red", 3,3,8,0.15,Math.PI,false,gameTime);

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