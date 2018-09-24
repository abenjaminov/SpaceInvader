class WaveManager {
    constructor(GameBoard, gameObjectManager, enemyGenerator) {
        this.Waves = [
            new Wave("Wave 1", GameBoard, 10,2,gameObjectManager, enemyGenerator),
            new Wave("Wave 2", GameBoard, 20,2,gameObjectManager, enemyGenerator),
            new Wave("Wave 3", GameBoard, 36,3,gameObjectManager, enemyGenerator),
            new Wave("Wave 4", GameBoard, 36,2,gameObjectManager, enemyGenerator)
        ];

        this.currentWaveIndex = 0;
        this.currentWave = this.Waves[0];
        this.Started = false;
        this.GameWon = false;
        this.GameBoard = GameBoard;
    }

    Start() {
        this.Started = true;
        this.currentWave.Start();
    }

    Draw(Context) {
        if(!this.Started) {
            Context.font = "35px Arial White";
            Context.fillStyle = "White";
            Context.fillText("Press Space to start", this.GameBoard.Width / 2 - 125, this.GameBoard.Height / 2 + 30);
        } else if(this.GameWon) {
            Context.font = "35px Arial White";
            Context.fillStyle = "White";
            Context.fillText("Game Won!!!", this.GameBoard.Width / 2 - 75, this.GameBoard.Height / 2 + 30);
        } else {
            this.currentWave.Draw(Context);            
        }
    }

    Update(gameTime) {
        if(!this.Started) {
            if(Keyboard.isKeyDown(Keyboard.keyCodes.Space)) {
                this.Start();
            }
        } else {
            this.currentWave.Update();

            if(this.currentWave.WaveOver) {
                this.currentWaveIndex++;

                if(this.Waves.length > this.currentWaveIndex) {
                    this.currentWave.ResetWave();
                    this.currentWave = this.Waves[this.currentWaveIndex];
                    this.currentWave.Start();
                } else {
                    this.GameWon = true;
                }
            }
        }
    }
}