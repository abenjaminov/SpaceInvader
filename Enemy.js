class Enemy extends GameObject {
    constructor(X, Y, Speed, Width, Height, image) {
        super(X, Y, Speed, Width, Height);

        this.image = image;
        
    }

    Draw(Context) {
        super.Draw(Context);
    }

    Update(Gameboard, gameTime) {
        if((this.X > Gameboard.Width && this.Speed > 0) || 
            (this.X < -this.Width && this.Speed < 0)) {
            this.Speed *= -1;
        }

        this.X += this.Speed;

        this.Y = Math.max(0, Math.min(this.Y, GameBoard.Height - this.Height));
    }
}