class Wave {
    constructor(name, gameBoard, numOfEnemies,miniWaves, gameObjectManager, enemyGenerator, spaceShip) {
        this.Name = name;
        this.MiniWaves = miniWaves;
        this.NumberOfEnemies = numOfEnemies;
        this.ObjectManager = gameObjectManager;
        this.EnemyGenerator = enemyGenerator;
        this.GameBoard = gameBoard;
        this.SpaceShip = spaceShip;
        
        this.ResetWave();
    }

    ResetWave() {
        this.StartWaveSequence = {
            enabled : false,
            ticks : 300,
            onGoing : 0
        };
        this.ReleaseEnemiesSequence = {
            enabled : false,
            miniWave : 1,
            enemiesGenerated : 0,
            miniWaveGenerated : false,
            numOfMiniWaves : this.MiniWaves,
            enemiesPerWave : this.NumberOfEnemies / this.MiniWaves
        };
        this.EndWaveSequence = {
            enabled : false,
            ticks : 200,
            onGoing : 0
        };

        this.WaveOver = false;
    }

    Start() {
        this.StartWaveSequence.enabled = true;
    }

    Draw(Context) {
        if(this.StartWaveSequence.enabled) {
            var ongoingFactor = Math.min(this.StartWaveSequence.onGoing, 200);
            Context.font = ongoingFactor / 2 + "px Arial Yellow";
            Context.fillStyle = "Yellow";
            Context.fillText(this.Name, this.GameBoard.Width / 2 - ongoingFactor / 1.5, this.GameBoard.Height / 2 + ongoingFactor / 4);
        } else if (this.EndWaveSequence.enabled) {
            Context.font = "30px Arial Yellow";
            Context.fillStyle = "Yellow";
            Context.fillText("Wave over", this.GameBoard.Width / 2 - 50, this.GameBoard.Height / 2 + 30);
        }
    }

    Update() {
        if(this.StartWaveSequence.enabled) {
            this.StartWaveSequence.onGoing++;

            if(this.StartWaveSequence.onGoing > this.StartWaveSequence.ticks) {
                this.StartWaveSequence.enabled = false;
                this.ReleaseEnemiesSequence.enabled = true;
            }
        } else if(this.ReleaseEnemiesSequence.enabled) {
            if(!this.ReleaseEnemiesSequence.miniWaveGenerated &&
               this.EnemyGenerator.GenerateEnemy(this.GameBoard, this.SpaceShip)) {
                this.ReleaseEnemiesSequence.enemiesGenerated++;

                if(this.ReleaseEnemiesSequence.enemiesGenerated == this.ReleaseEnemiesSequence.enemiesPerWave) {
                    this.ReleaseEnemiesSequence.miniWaveGenerated = true;
                }
            }

            if(this.ReleaseEnemiesSequence.miniWaveGenerated && this.ObjectManager.Enemies.length == 0) {
                this.ReleaseEnemiesSequence.miniWave++;

                if(this.ReleaseEnemiesSequence.miniWave > this.ReleaseEnemiesSequence.numOfMiniWaves) {
                    this.EndWaveSequence.enabled = true;
                    this.ReleaseEnemiesSequence.enabled = false;
                } else {
                    this.ReleaseEnemiesSequence.enemiesGenerated = 0;
                    this.ReleaseEnemiesSequence.miniWaveGenerated = false;
                }
            }
        } else if(this.EndWaveSequence.enabled) {
            this.EndWaveSequence.onGoing++;

            if(this.EndWaveSequence.onGoing > this.EndWaveSequence.ticks) {
                this.EndWaveSequence.enabled = false;
                this.WaveOver = true;
            }
        }
    }
}