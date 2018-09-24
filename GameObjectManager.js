class GameObjectManager {
    constructor(GameBoard, spaceShip) {
        this.Enemies = [];
        this.ShipShots = [];
        this.EnemyShots = [];
        this.EnemyGenerator = new EnemyGenerator(GameBoard, this);
        this.SpaceShip = spaceShip;
    }

    Draw(Context) {
        this.SpaceShip.Draw(ctx);
        this.ShipShots.forEach((p) => p.Draw(Context));
        this.Enemies.forEach((e) => e.Draw(Context));
    }

    Update(gameTime, gameBoard) {
        this.SpaceShip.Update(GameBoard, gameTime, objectManager);
        this.EnemyGenerator.Update(gameBoard,gameTime);
        this.UpdateShots(gameTime, gameBoard)

        return this.UpdateEnemies(gameTime, gameBoard);
    }

    UpdateEnemies(gameTime, gameBoard) {
        var pointsEarned = 0;
        this.Enemies.forEach((e) => e.Update(gameBoard, gameTime));

        for(var enemyIndex = 0; enemyIndex < this.Enemies.length; enemyIndex++) {
            var enemy = this.Enemies[enemyIndex];
            if(!enemy.isDieing) {
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
            }

            if(!enemy.isAlive) {
                pointsEarned += enemy.Points;
                this.Enemies.splice(enemyIndex, 1);
                enemyIndex--;
            }
        }

        return pointsEarned;
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