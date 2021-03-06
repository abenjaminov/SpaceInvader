class Sprite {
    constructor(folder, numOfImages, timePerImage, width, height) {
        this.images = [];

        for(var nIndex = 0; nIndex < numOfImages; nIndex++) {
            this.images[nIndex] = new Image(width,height);
            this.images[nIndex].src = folder + "/" + (nIndex + 1) + ".png";
        }

        this.Width = width;
        this.Height = height;
        this.currentImage = 0;
        this.numOfImages = numOfImages;
        this.timePerImage = timePerImage;
        this.PreviousImageTime = timePerImage;
        this.spriteEnded = false;
        this.DrawingPosition = null;
    }

    SetDrawingPosition(x, y) {
        this.DrawingPosition = { X : x, Y : y}
    }

    Draw(Context, x, y) {
        if(!this.spriteEnded) {
            if(this.DrawingPosition == null) {
                this.DrawingPosition = { X : x, Y : y};
            }
            Context.drawImage(this.images[this.currentImage], this.DrawingPosition.X, this.DrawingPosition.Y, this.Width, this.Height);
        }
    }

    Update(gameTime) {
        this.PreviousImageTime--;

        if(this.PreviousImageTime <= 0) {
            if(this.currentImage == this.numOfImages - 1) {
                this.spriteEnded = true;
            } else if(this.currentImage == 0) {
                this.spriteEnded = false;
            }

            this.currentImage = (this.currentImage + 1) % this.numOfImages;
            this.PreviousImageTime = this.timePerImage;
        }
    }
}