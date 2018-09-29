class Spaceship extends GameObject {
    constructor(X, Y, Speed) {
        super(X, Y, Speed, 64, 64);
        
        this.Type = GameObjectTypes.GameShip;

        this.X -= this.Width / 2;

        this.VerticalAcceleration = 0;
        this.HorizontalAcceleration = 0;
        this.Acc = 0.05;
        this.Cannon = new ShipCannon(this,1,CannonFireRate.Fast,CannonFireSpeed.Fast, DefaultAngles.Up);
        this.Health = 100;
        this.IsDead = false;
        super.image = document.getElementById("ship_image");
        this.IsExploding = false;
        this.explosionSprite = new Sprite(SpritesFolders.explosion, 15, 3, 128,128);
    }

    Draw(Context) {
        if(!this.IsExploding && !this.IsDead) {
            super.Draw(Context);
        } else {
            this.explosionSprite.Draw(Context, this.X, this.Y);
        }
    }

    Update(GameBoard, gameTime, gameObjectManager) {
        if(this.IsExploding) {
            this.explosionSprite.Update(gameTime);
            if(this.explosionSprite.spriteEnded) {
                this.IsExploding = false;
            }
        } else {
            var movementVector = { x: 0, y:0 }

            if(Keyboard.isKeyDown(Keyboard.keyCodes.Space)) {
                this.Cannon.Shoot(gameTime, gameObjectManager);
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

    Explode() {
        this.IsExploding = true;
    }

    Hit(Damage) {
        this.Health -= Damage;
        if(this.Health <= 0) {
            this.IsExploding = true;
            this.IsDead = true;
        }
    }
}