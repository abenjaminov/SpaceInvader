var CANNON_COOLDOWN = 20;

class ShipCannon {
    constructor(OwnerShip) {
        this.OwnerShip = OwnerShip;
        
        this.Particles = [];
        this.Cooldown = CANNON_COOLDOWN;
    }
    
    Shoot(gameTime) {
        if(this.Cooldown === 0) {
            let newParticle = new Particle(this.X, this.Y, "Red", 5,5,4,0.15,Math.PI,false,gameTime);

            this.Particles.push(newParticle);

            this.Cooldown = CANNON_COOLDOWN;
        }
    }

    Draw(Context) {
        this.Particles.forEach((p) => p.Draw(Context));
    }

    Update(gameTime) {
        if(this.Cooldown > 0) {
            this.Cooldown--;
        }

        this.X  = this.OwnerShip.X + this.OwnerShip.Width / 2;
        this.Y = this.OwnerShip.Y;

        this.Particles.forEach((p) => p.Update(gameTime));
    }
}