var ENEMY_COOLDOWN = 60;

class EnemyGenerator {
    constructor(GameBoard, GameObjectManager) {
        this.EnemyImage = document.getElementById("enemy1");
        this.Enemies = [];
        this.EnemyCooldown
        this.objectManager = GameObjectManager;
        this.GameBoard = GameBoard;
    }

    GenerateEnemy() {
        var EnemyWidth = 30;
        var EnemyHeight = 30;
        var EnemySpeed = 1;

        var enemyBoardHeight = this.GameBoard.Height / 3;
        var enemyBoardWidth = this.GameBoard.Width;
        
        var spawnY = Math.floor(Math.random() * enemyBoardHeight) + EnemyHeight;
        var spawnX = -EnemyWidth - EnemySpeed;

        if((Math.floor(Math.random() * 2) + 1) === 1 ) {
            spawnX = enemyBoardWidth + 5;
        } 

        this.objectManager.AddEnemy(new Enemy(spawnX, spawnY, EnemySpeed, EnemyWidth, EnemyHeight, this.EnemyImage));
    }

    Update(gameTime) {
        if(this.EnemyCooldown > 0) {
            this.EnemyCooldown--;
        } else {
            this.GenerateEnemy();
            this.EnemyCooldown = ENEMY_COOLDOWN;
        }
    }

    Draw(Context) {

    }
}