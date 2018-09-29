class Particle extends GameObject {
    constructor(x, y, color, width, height, maxSpeed, acceleration, angle, timeSpan, gameTime, owner, image = null) {
        super(x,y,maxSpeed,width,height);
        this.Color = color;
        this.Acceleration = acceleration;
        this.Angle = angle;
        this.TimeSpan = timeSpan;
        this.Birth = gameTime;
        this.Owner = owner;
        this.isAlive = true;
        super.image = image;
        this.Spent = false;
    }

    Draw(Context) {
        Context.save();
        Context.translate(this.X, this.Y);
        Context.rotate(this.Angle + 0.5*Math.PI);
        Context.drawImage(this.image,-(this.Width/2), -(this.Height/2), this.Width, this.Height);
        Context.restore(); 
    }

    Update(gameTime, gameBoard) {
        super.Update({}, gameTime)
        if(gameTime && this.TimeSpan && gameTime - this.Birth > this.TimeSpan) {
            // Kill Particle
            this.isAlive = false;
        } else {
            this.X += Math.cos(this.Angle) * this.Speed;
            this.Y += Math.sin(this.Angle) * this.Speed;

            this.CalculateIsAlive(gameBoard);
        }
    }

    CalculateIsAlive(gameBoard) {
        if(this.X < 0 || this.X > gameBoard.Width + this.Width ||
           this.Y < 0 || this.Y > gameBoard.height + this.Height) {
               this.isAlive = false;
           }
    }

    Spend() {
        this.isAlive = false;
    }
}