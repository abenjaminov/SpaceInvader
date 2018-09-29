class Game {
    constructor(canvas) {
        var gameDetailsDisplayRectHeight = 100;

        this.GameShip = new Spaceship(canvas.width / 2, canvas.height - gameDetailsDisplayRectHeight - 100,2);
        this.GameDetails = new GameDetails(0, canvas.height - gameDetailsDisplayRectHeight, canvas.width, gameDetailsDisplayRectHeight);
        this.GameBoard = {Height : canvas.height - gameDetailsDisplayRectHeight, Width : canvas.width};
        this.ObjectManager = new GameObjectManager(this.GameBoard, this.GameShip);
        this.EnemyGenerator = new EnemyGenerator(this.GameBoard, this.ObjectManager);
        this.WaveManager = new WaveManager(this.GameBoard, this.ObjectManager, this.EnemyGenerator);
        this.IsGamePlaying = false;
        this.GameWon = false;
    }

    StartGame() {
        this.IsGamePlaying = true;
    }

    StopGame() {
        this.IsGamePlaying = false;
    }

    Draw(Context) {
        if(!this.IsGamePlaying) {
            Context.font = "35px Comic Sans MS White";
            Context.fillStyle = "White";
            Context.fillText("Press Space to start", this.GameBoard.Width / 2 - 125, this.GameBoard.Height / 2 + 30);
        } else if(this.GameWon) {
            Context.font = "35px Comic Sans MS White";
            Context.fillStyle = "White";
            Context.fillText("Game Won!!!", this.GameBoard.Width / 2 - 75, this.GameBoard.Height / 2 + 30);
        } else {
            this.WaveManager.Draw(Context);
            this.ObjectManager.Draw(Context);
            this.GameDetails.Draw(Context);         
        }
    }

    Update(gameTime) {
        if(!this.IsGamePlaying) {
            if(Keyboard.isKeyDown(Keyboard.keyCodes.Space)) {
                this.StartGame();
                this.WaveManager.Start();
            }
        } else {
            this.WaveManager.Update(gameTime);
            this.EnemyGenerator.Update(gameTime, this.GameBoard);
            var pointsEarned = this.ObjectManager.Update(gameTime, this.GameBoard, this.IsGamePlaying);

            this.GameDetails.UpdatePoints(pointsEarned);

            if(this.WaveManager.AllWavedDone) {
                this.StopGame();
                this.GameWon = true;
            }
        }
    }
}