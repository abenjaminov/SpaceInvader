class Spaceship {
    constructor(X, Y, Speed) {
        this.X = X;
        this.Y = Y;
        this.Width = 29 ;
        this.Height = 50;
        this.Speed = Speed;
        this.VerticalAcceleration = 0;
        this.HorizontalAcceleration = 0;
        this.Acc = 0.05;
        this.Cannon = new ShipCannon(this);
        this.image = document.getElementById("ship_image");
    }

    Draw(Context) {
        Context.drawImage(this.image,this.X, this.Y, this.Width, this.Height);

        this.Cannon.Draw(Context);
    }

    Update(GameBoard, gameTime) {
        var movementVector = { x: 0, y:0 }

        if(Keyboard.isKeyDown(Keyboard.keyCodes.Space)) {
            this.Cannon.Shoot(gameTime);
        }

        if(Keyboard.isKeyDown(Keyboard.keyCodes.RightArrow)) {
            this.HorizontalAcceleration = Math.min(this.Speed, this.HorizontalAcceleration + this.Acc);
            movementVector.x = this.HorizontalAcceleration;
        } else if(Keyboard.isKeyDown(Keyboard.keyCodes.LeftArrow)) {
            this.HorizontalAcceleration = Math.max(-this.Speed, this.HorizontalAcceleration - this.Acc);
            movementVector.x = this.HorizontalAcceleration
        } else if(this.HorizontalAcceleration != 0) {
            if(this.HorizontalAcceleration > 0) {
                this.HorizontalAcceleration = Math.max(0, this.HorizontalAcceleration - this.Acc)
                movementVector.x = this.HorizontalAcceleration;
            } else {
                this.HorizontalAcceleration = Math.min(0, this.HorizontalAcceleration + this.Acc)
                movementVector.x = this.HorizontalAcceleration;
            }
        }

        if(Keyboard.isKeyDown(Keyboard.keyCodes.DownArrow)) {
            this.VerticalAcceleration = Math.min(this.Speed, this.VerticalAcceleration + this.Acc);
            movementVector.y = Math.min(this.Speed, this.VerticalAcceleration);
        } else if(Keyboard.isKeyDown(Keyboard.keyCodes.UpArrow)) {
            this.VerticalAcceleration = Math.max(-this.Speed, this.VerticalAcceleration - this.Acc);
            movementVector.y = this.VerticalAcceleration;
        } else if(this.VerticalAcceleration != 0) {
            if(this.VerticalAcceleration > 0) {
                this.VerticalAcceleration = Math.max(0, this.VerticalAcceleration - this.Acc)
                movementVector.y = this.VerticalAcceleration;
            } else {
                this.VerticalAcceleration = Math.min(0, this.VerticalAcceleration + this.Acc)
                movementVector.y = this.VerticalAcceleration;
            }
        }

        this.X += movementVector.x;
        this.Y += movementVector.y;

        this.X = Math.max(0, Math.min(this.X, GameBoard.Width - this.Width));
        this.Y = Math.max(0, Math.min(this.Y, GameBoard.Height - this.Height));

        this.Cannon.Update(gameTime);
    }
}