class Particle extends GameObject {
    constructor(x, y, color, width, height, maxSpeed, acceleration, angle, timeSpan, gameTime, image = null) {
        super(x,y,maxSpeed,width,height);
        this.Color = color;
        this.Acceleration = acceleration;
        this.Angle = angle;
        this.TimeSpan = timeSpan;
        this.Birth = gameTime;
        this.isAlive = true;
        super.image = image;
    }

    Draw(Context) {
        super.Draw(Context);
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
}