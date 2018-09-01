class Particle extends GameObject {
    constructor(x, y, color, width, height, maxSpeed, acceleration, angle, timeSpan, gameTime) {
        super(x,y,maxSpeed,width,height);


        this.Color = color;
        
        
        this.Acceleration = acceleration;
        this.Angle = angle;
        this.TimeSpan = timeSpan;
        this.Birth = gameTime;
        this.isAlive = true;
    }

    Draw(Context) {
        super.Draw(Context);

        Context.beginPath();
        Context.arc(this.X, this.Y, this.Width, 0, Math.PI*2);
        Context.fillStyle = this.Color;
        Context.fill();
        Context.closePath();
    }

    Update(gameTime) {
        super.Update({}, gameTime)
        if(this.TimeSpan && gameTime - this.Birth > this.TimeSpan) {
            // Kill Particle
            this.isAlive = false;
        } else {
            this.X += Math.sin(this.Angle) * this.Speed;
            this.Y += Math.cos(this.Angle) * this.Speed;
        }
    }
}