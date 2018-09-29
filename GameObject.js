class GameObject {
    constructor(X, Y, Speed, Width, Height) {
        this.X = X;
        this.Y = Y;
        this.Width = Width ;
        this.Height = Height;
        this.Speed = Speed;
        this.image = undefined;
        this.Type = GameObjectTypes.GameObject;
    }

    Draw(Context) {
        if(this.image) {
            Context.drawImage(this.image,this.X, this.Y, this.Width, this.Height);
        }
    }

    Update(GameBoard, gameTime) {
    }

    GetCenterPoint() {
        return {X : this.X + this.Width / 2, Y: this.Y + this.Height / 2};
    }
}