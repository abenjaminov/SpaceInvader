class Enemy extends GameObject {
    constructor(Gameboard, X, Y, Speed, Width, Height, image, number, life) {
        super(X, Y, Speed, Width, Height);

        this.image = image;
        this.Number = number;
        this.Angle = 0;
        this.Life = life;
        this.isAlive = true;
        this.Angle = this.GetRandomAngle(Gameboard);
        
    }

    GetRandomAngle(Gameboard) {
        var destinationPoint = {
            X : Gameboard.Width / 2,
            Y : GetRandomNum(0, Gameboard.Height / 2)
        }

        return GetDirectionToPoint(destinationPoint, {X : this.X, Y: this.Y});
    }

    Draw(Context) {
        super.Draw(Context);
        Context.font = "12px Arial Yellow";
        Context.fillStyle = "Yellow";
        Context.fillText(this.Life, this.X + this.Width, this.Y + this.Height / 2);

        var center = this.GetCenter();
        var part = new Particle(center.X, center.Y, "Red", 3, 3, 0 ,0 ,0 ,false, false);

        part.Draw(Context);
    }

    Update(Gameboard, gameTime)  {
        //console.log("Enemy " + this.Number + "{ X:" + this.X + ", Y : " + this.Y + ", Angle : " + this.Angle + "}");

        if((this.X < -this.Width && !IsInQuarters(this.Angle,["1","4"])) || 
            (this.X > GameBoard.Width && !IsInQuarters(this.Angle,["2","3"])) ||
            (this.Y < -this.Height && !IsInQuarters(this.Angle,["1","2"])) ||
            (this.Y > GameBoard.Height && !IsInQuarters(this.Angle,["3","4"]))) {

            this.Angle += this.GetRandomAngle(Gameboard);
        }

        this.X += Math.cos(this.Angle) * this.Speed;
        this.Y += Math.sin(this.Angle) * this.Speed;   
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
        this.Life -= Damage;

        if(this.Life <= 0) {
            this.isAlive = false;
        }
    }
}