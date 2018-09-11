var ENEMY_COOLDOWN = 60;

class EnemyGenerator {
    constructor(GameBoard, GameObjectManager) {
        this.EnemyImage = document.getElementById("enemy1");
        this.Enemies = [];
        this.EnemyCooldown = 0;
        this.objectManager = GameObjectManager;
        this.GameBoard = GameBoard;
        this.EnemyCount = 0;
    }

    GenerateEnemy(GameBoard) {
        if(this.EnemyCooldown <= 0) {
            this.EnemyCount++;
            var EnemyWidth = 30;
            var EnemyHeight = 30;
            var EnemySpeed = 1;

            var enemyBoardHeight = this.GameBoard.Height / 3;
            var enemyBoardWidth = this.GameBoard.Width;
            
            var spawnY = Math.floor(GetRandomNum(EnemyHeight, enemyBoardHeight));
            var spawnX = -EnemyWidth - EnemySpeed;

            if(Math.floor(GetRandomNum(0,2)) === 1 ) {
                spawnX = enemyBoardWidth + 5;
            } 

            this.objectManager.AddEnemy(new Enemy(GameBoard, spawnX, spawnY, EnemySpeed, EnemyWidth, EnemyHeight, this.EnemyImage, this.EnemyCount));
            this.EnemyCooldown = ENEMY_COOLDOWN;
        }
    }

    Update(GameBoard, gameTime) {
        if(Keyboard.isKeyDown(Keyboard.keyCodes.E)) {
            this.GenerateEnemy(GameBoard);
        }

        if(this.EnemyCooldown > 0) {
            this.EnemyCooldown--;
        }
    }

    Draw(Context) {

    }
}