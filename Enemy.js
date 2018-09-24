class Enemy extends GameObject {
    constructor(Gameboard, X, Y, Speed, Width, Height, image, number, life, points) {
        super(X, Y, Speed, Width, Height);

        this.image = image;
        this.Number = number;
        this.Angle = 0;
        this.Life = life;
        this.isDieing = false;
        this.isAlive = true;
        this.Angle = this.GetRandomAngle(Gameboard);
        this.Points = points;

        this.explosionSprite = new Sprite(SpritesFolders.explosion, 15, 3, 64,64);
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
            
            var center = this.GetCenter();
            var part = new Particle(center.X, center.Y, "Red", 3, 3, 0 ,0 ,0 ,false, false);

            part.Draw(Context);
        }
    }

    Update(Gameboard, gameTime)  {
        if(this.isDieing) {
            this.explosionSprite.Update(gameTime);
            if(this.explosionSprite.spriteEnded) {
                this.isAlive = false;
            }
        } else {
            if((this.X < -this.Width && !IsInQuarters(this.Angle,["1","4"])) || 
            (this.X > GameBoard.Width && !IsInQuarters(this.Angle,["2","3"])) ||
            (this.Y < -this.Height && !IsInQuarters(this.Angle,["1","2"])) ||
            (this.Y > GameBoard.Height && !IsInQuarters(this.Angle,["3","4"]))) {

                this.Angle = this.GetRandomAngle(Gameboard);
            }

            this.X += Math.cos(this.Angle) * this.Speed;
            this.Y += Math.sin(this.Angle) * this.Speed;   
        }
    }

    GetCenter() {
        var halfCross = Math.sqrt(Math.pow(this.Width / 2,2) + Math.pow(this.Height / 2, 2));
        var angleRadians = 0.25 * Math.PI;

        var center = {
            X : this.X + halfCross * Math.cos(angleRadians),
            Y : this.Y + halfCross * Math.sin(angleRadians)
        }

        return center;
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