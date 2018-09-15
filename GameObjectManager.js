class GameObjectManager {
    constructor(GameBoard) {
        this.Enemies = [];
        this.ShipShots = [];
        this.EnemyShots = [];
        this.EnemyGenerator = new EnemyGenerator(GameBoard, this);
    }

    Draw(Context) {
        this.ShipShots.forEach((p) => p.Draw(Context));
        this.Enemies.forEach((e) => e.Draw(Context));
    }

    Update(gameTime, gameBoard) {
        this.UpdateShots(gameTime, gameBoard)

        this.UpdateEnemies(gameTime, gameBoard);
        this.EnemyGenerator.Update(gameBoard,gameTime);
    }

    UpdateEnemies(gameTime, gameBoard) {
        this.Enemies.forEach((e) => e.Update(gameBoard, gameTime));

        for(var enemyIndex = 0; enemyIndex < this.Enemies.length; enemyIndex++) {
            var enemy = this.Enemies[enemyIndex];
            var enemyCenter = enemy.GetCenter();

            for(var shotIndex = 0; shotIndex < this.ShipShots.length; shotIndex++) {
                var shot = this.ShipShots[shotIndex];
                
                var distance = Math.sqrt(Math.pow(enemyCenter.X - shot.X, 2) + Math.pow(enemyCenter.Y - shot.Y, 2));

                if(distance <= enemy.Width / 2) {
                    this.ShipShots.splice(shotIndex, 1);
                    enemy.Hit(10);

                    break;       
                }
            }

            if(!enemy.isAlive) {
                this.Enemies.splice(enemyIndex, 1);
                enemyIndex--;
            }
        }
    }

    UpdateShots(gameBoard, gameTime) {
        this.ShipShots.forEach((p) => p.Update(gameTime, gameBoard));

        for(var nIndex = 0; nIndex < this.ShipShots.length; nIndex++) {
            if(!this.ShipShots[nIndex].isAlive) {
                this.ShipShots.splice(nIndex,1);
                nIndex--;
            }
        }
    }

    AddEnemy(Enemy) {
        this.Enemies.push(Enemy);
    }

    AddShipShot(Particle) {
        this.ShipShots.push(Particle);
    }
}