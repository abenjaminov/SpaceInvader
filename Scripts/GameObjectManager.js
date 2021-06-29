class GameObjectManager {
    constructor(GameBoard, spaceShip) {
        this.Enemies = [];
        this.Shots = [];
        this.EnemyShots = [];
        this.SpaceShip = spaceShip;
        this.PlayingSprites = [];
    }

    Draw(Context) {
        this.SpaceShip.Draw(ctx);
        this.Shots.forEach((p) => p.Draw(Context));
        this.Enemies.forEach((e) => e.Draw(Context));
        this.PlayingSprites.forEach((s) => s.Draw(Context));
        
    }

    Update(gameTime, gameBoard, isGamePlaying) {
        if(isGamePlaying) {
            
            this.UpdateShots(gameTime, gameBoard)
            this.UpdateSprites(gameBoard, gameTime);
            return this.UpdateGameObjects(gameTime, gameBoard);
        }
    }

    UpdateSprites(gameBoard,gameTime) {
        for(var nIndex = 0; nIndex < this.PlayingSprites.length;nIndex++) {
            var sprite = this.PlayingSprites[nIndex];

            sprite.Update(gameBoard, gameTime);

            if(sprite.spriteEnded) {
                this.PlayingSprites.splice(nIndex, 1);
            }
        }
    }

    UpdateGameObjects(gameTime, gameBoard) {
        var pointsEarned = 0;
        this.SpaceShip.Update(gameBoard, gameTime, this);
        this.Enemies.forEach((e) => e.Update(gameBoard, gameTime));

        for(var shotIndex = 0; shotIndex < this.Shots.length; shotIndex++) {
            var shot = this.Shots[shotIndex];
            
            if(!shot.isAlive) {
                continue;
            }

            if(shot.Owner.Type == GameObjectTypes.Enemy) {
                var shipCenter = this.SpaceShip.GetCenterPoint();

                var distance = Math.sqrt(Math.pow(shipCenter.X - shot.X, 2) + Math.pow(shipCenter.Y - shot.Y, 2));

                if(distance <= this.SpaceShip.Height / 2) {
                    this.SpaceShip.Hit(10);
                    shot.Spend();  
                    this.BlowShot(shot);
                }
            } else {

                for(var enemyIndex = 0; enemyIndex < this.Enemies.length; enemyIndex++) {
                    var enemy = this.Enemies[enemyIndex];

                    if(!enemy.isDieing) {
                        var enemyCenter = enemy.GetCenterPoint();
            
                        var distance = Math.sqrt(Math.pow(enemyCenter.X - shot.X, 2) + Math.pow(enemyCenter.Y - shot.Y, 2));
        
                        if(distance <= enemy.Height / 2) {
                            enemy.Hit(10);     
                            shot.Spend();
                            this.BlowShot(shot);
                        }
        
                        if(enemy.isDieing) {
                            pointsEarned += enemy.Points;
                        }
                    }
        
                    if(!enemy.isAlive) {
                        this.Enemies.splice(enemyIndex, 1);
                        enemyIndex--;
                    }
                }
            }
        }

        return pointsEarned;
    }

    UpdateShots(gameBoard, gameTime) {
        this.Shots.forEach((p) => p.Update(gameTime, gameBoard));

        for(var nIndex = 0; nIndex < this.Shots.length; nIndex++) {
            if(!this.Shots[nIndex].isAlive) {
                this.Shots.splice(nIndex,1);
                nIndex--;
            }
        }
    }

    AddEnemy(Enemy) {
        this.Enemies.push(Enemy);
    }

    AddShipShot(Particle) {
        this.Shots.push(Particle);
    }

    BlowShot(shot) {
        var sprite = new Sprite(SpritesFolders.explosion, 15, 3, 16,16);
        sprite.SetDrawingPosition(shot.X, shot.Y);
        this.PlayingSprites.push(sprite);
    }
}