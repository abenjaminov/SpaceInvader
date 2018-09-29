class Enemy extends GameObject {
    constructor(Gameboard, X, Y, Speed, Width, Height, image, number, life, points, SpaceShip, gameObjectManager) {
        super(X, Y, Speed, Width, Height);

        this.Type = GameObjectTypes.Enemy;

        this.image = image;
        this.Number = number;
        this.Angle = 0;
        this.Life = life;
        this.isDieing = false;
        this.isAlive = true;
        this.Angle = this.GetRandomAngle(Gameboard);
        this.Points = points;
        this.gameObjectManager = gameObjectManager;

        this.explosionSprite = new Sprite(SpritesFolders.explosion, 15, 3, 64,64);
        this.Cannon = new ShipCannon(this,2,CannonFireRate.Slow,CannonFireSpeed.Slow, DefaultAngles.Down, SpaceShip);
    }

    GetRandomAngle(Gameboard) {
        var destinationPoint = {
            X : Gameboard.Width / 2,
            Y : GetRandomNum(0, Gameboard.Height / 2)
        }

        return GetDirectionToPoint(destinationPoint, {X : this.X, Y: this.Y});
    }

    Draw(Context) {
        if(this.isDieing) {
            this.explosionSprite.Draw(Context, this.X, this.Y);
        } else {
            super.Draw(Context);
        }
    }

    Update(Gameboard, gameTime)  {
        if(this.isDieing) {
            this.explosionSprite.Update(gameTime);
            if(this.explosionSprite.spriteEnded) {
                this.isAlive = false;
            }
        } else {
            this.Cannon.Shoot(gameTime, this.gameObjectManager);
            this.Cannon.Update(gameTime, this.gameObjectManager);

            if((this.X < -this.Width && !IsInQuarters(this.Angle,["1","4"])) || 
            (this.X > Gameboard.Width && !IsInQuarters(this.Angle,["2","3"])) ||
            (this.Y < -this.Height && !IsInQuarters(this.Angle,["1","2"])) ||
            (this.Y > Gameboard.Height && !IsInQuarters(this.Angle,["3","4"]))) {

                this.Angle = this.GetRandomAngle(Gameboard);
            }

            this.X += Math.cos(this.Angle) * this.Speed;
            this.Y += Math.sin(this.Angle) * this.Speed;   
        }
    }

    Hit(Damage) {
        if(!this.isDieing) {
            this.Life -= Damage;

            if(this.Life <= 0) {
                this.isDieing = true;
            }
        }
    }
}