class GameObject {
    constructor(X, Y, Speed, Width, Height) {
        this.X = X;
        this.Y = Y;
        this.Width = Width ;
        this.Height = Height;
        this.Speed = Speed;
        this.image = undefined;
    }

    Draw(Context) {
        if(this.image) {
            Context.drawImage(this.image,this.X, this.Y, this.Width, this.Height);
        }
    }

    Update(GameBoard, gameTime) {
    }
}