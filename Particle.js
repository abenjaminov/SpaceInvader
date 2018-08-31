class Particle {
    constructor(x, y, color, width, height, maxSpeed, acceleration, angle, timeSpan, gameTime) {
        this.X = x;
        this.Y = y;
        this.Color = color;
        this.Width = width;
        this.Height = height;
        this.MaxSpeed = maxSpeed;
        this.Acceleration = acceleration;
        this.Angle = angle;
        this.TimeSpan = timeSpan;
        this.Birth = gameTime;
        this.isAlive = true;
    }

    Draw(Context) {
        Context.beginPath();
        Context.arc(this.X, this.Y, this.Width, 0, Math.PI*2);
        Context.fillStyle = this.Color;
        Context.fill();
        Context.closePath();
    }

    Update(gameTime) {
        if(this.TimeSpan && gameTime - this.Birth > this.TimeSpan) {
            // Kill Particle
            this.isAlive = false;
        } else {
            this.X += Math.sin(this.Angle) * this.MaxSpeed;
            this.Y += Math.cos(this.Angle) * this.MaxSpeed;
        }
    }
}