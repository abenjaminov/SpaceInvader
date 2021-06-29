class GameDetails {
    constructor(xLocation, yLocation, width, height, SpaceShip) {
        this.Points = 0;
        this.Height = height;
        this.Width = width;
        this.SpaceShip = SpaceShip;
        this.Location = {
            X : xLocation,
            Y : yLocation
        }
    }

    Draw(Context) {
        Context.save();
        Context.beginPath();
        Context.rect(this.Location.X, this.Location.Y, this.Width, this.Height);
        Context.globalAlpha = 0.2;
        Context.fillStyle = "Red";
        Context.fill();
        Context.closePath();
        Context.restore();

        Context.font = "16px Arial Yellow";
        Context.fillStyle = "Yellow";
        Context.fillText("Points : " + this.Points, this.Location.X + 5, this.Location.Y + 16);

        Context.fillText("Health : " + this.SpaceShip.Health, this.Location.X + 5, this.Location.Y + 38);

    }

    UpdatePoints(pointsToAdd) {
        this.Points += pointsToAdd;
    }
}