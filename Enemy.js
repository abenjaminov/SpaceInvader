class Enemy extends GameObject {
    constructor(X, Y, Speed, Width, Height, image) {
        super(X, Y, Speed, Width, Height);

        this.image = image;
        
    }

    Draw(Context) {
        super.Draw(Context);
    }

    Update(Gameboard, gameTime) {
        if(this.X > Gameboard.Width) {
            this.Speed *= -1;
        }

        this.X += this.Speed;
    }
}