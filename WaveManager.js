class WaveManager {
    constructor(GameBoard, gameObjectManager, enemyGenerator, spaceShip) {
        this.Waves = [
            new Wave("Wave 1", GameBoard, 10,2,gameObjectManager, enemyGenerator, spaceShip),
            new Wave("Wave 2", GameBoard, 20,2,gameObjectManager, enemyGenerator, spaceShip),
            new Wave("Wave 3", GameBoard, 36,3,gameObjectManager, enemyGenerator, spaceShip),
            new Wave("Wave 4", GameBoard, 36,2,gameObjectManager, enemyGenerator, spaceShip)
        ];

        this.currentWaveIndex = 0;
        this.currentWave = this.Waves[0];
        this.Started = false;
        this.AllWavedDone = false;
        this.GameBoard = GameBoard;
    }

    Start() {
        this.Started = true;
        this.currentWave.Start();
    }

    Draw(Context) {
        if(this.Started) {
            this.currentWave.Draw(Context);            
        }
    }

    Update(gameTime) {
        if(this.Started) {
            this.currentWave.Update();

            if(this.currentWave.WaveOver) {
                this.currentWaveIndex++;

                if(this.Waves.length > this.currentWaveIndex) {
                    this.currentWave.ResetWave();
                    this.currentWave = this.Waves[this.currentWaveIndex];
                    this.currentWave.Start();
                } else {
                    this.AllWavedDone = true;
                }
            }
        }
    }
}