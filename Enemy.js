class Enemy extends GameObject {
    constructor(Gameboard, X, Y, Speed, Width, Height, image, number) {
        super(X, Y, Speed, Width, Height);

        this.image = image;
        this.Number = number;
        this.Angle = 0;
        //console.log("Enemy " + X + ", " + Y);

        var destinationPoint = {
            X : Gameboard.Width / 2,
            Y : GetRandomNum(0, Gameboard.Height / 2)
        }

        this.Angle = GetDirectionToPoint(destinationPoint, {X : this.X, Y: this.Y});
        
    }

    GetRandomAngle(minAngle, maxAngle) {
        return (Math.random() * maxAngle) + minAngle;
    }

    Draw(Context) {
        super.Draw(Context);
        Context.font = "12px Arial Yellow";
        Context.fillStyle = "Yellow";
        Context.fillText(this.Number, this.X + this.Width, this.Y + this.Height / 2);
    }

    Update(Gameboard, gameTime)  {
        console.log("Enemy " + this.Number + "{ X:" + this.X + ", Y : " + this.Y + ", Angle : " + this.Angle + "}");

        if((this.X < -this.Width && !IsInQuarters(this.Angle,["1","4"])) || 
            (this.X > GameBoard.Width && !IsInQuarters(this.Angle,["2","3"])) ||
            (this.Y < -this.Height && !IsInQuarters(this.Angle,["1","2"])) ||
            (this.Y > GameBoard.Height && !IsInQuarters(this.Angle,["3","4"]))) {

            this.Angle += Math.PI;
            this.Angle += GetRandomNum(-Math.PI / 10, Math.PI / 10);
        }

        this.X += Math.cos(this.Angle) * this.Speed;
        this.Y += Math.sin(this.Angle) * this.Speed;
        
    }
}