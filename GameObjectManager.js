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
        this.ManageShots(gameTime, gameBoard)

        this.Enemies.forEach((e) => e.Update(gameBoard, gameTime));
        this.EnemyGenerator.Update(gameBoard,gameTime);
    }

    ManageShots(gameBoard, gameTime) {
        this.ShipShots.forEach((p) => p.Update(gameTime, gameBoard));

        for(var nIndex = 0; nIndex < this.ShipShots.length; nIndex++) {
            if(!this.ShipShots[nIndex].isAlive) {
                this.ShipShots.splice(nIndex,1);
                console.log("dead");
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