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
    }

    Draw(Context, X, Y) {
        Context.drawImage(this.images[this.currentImage], X, Y, this.Width, this.Height);
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