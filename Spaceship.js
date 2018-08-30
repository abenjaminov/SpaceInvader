class Spaceship {
    constructor(X, Y, Speed) {
        this.X = X;
        this.Y = Y;
        this.Width = 29 ;
        this.Height = 50;
        this.Speed = Speed;
        this.VerticalAcceleration = 0;
        this.HorizontalAcceleration = 0;
    }

    Draw(Context) {
        Context.beginPath();
        Context.rect(this.X, this.Y, this.Width, this.Height);
        Context.fillStyle = "Blue";
        Context.fill();
        Context.closePath();
    }

    Update(GameBoard, gameTime) {
    }
}