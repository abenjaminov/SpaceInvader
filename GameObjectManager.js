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

    Update(gameTime, GameBoard) {
        this.ShipShots.forEach((p) => p.Update(gameTime));
        this.Enemies.forEach((e) => e.Update(GameBoard, gameTime));
        this.EnemyGenerator.Update(GameBoard,gameTime);
    }

    AddEnemy(Enemy) {
        this.Enemies.push(Enemy);
    }

    AddShipShot(Particle) {
        this.ShipShots.push(Particle);
    }
}