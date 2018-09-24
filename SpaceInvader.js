var windowHeight = window.innerHeight;

var canvas = document.getElementById("gameCanvas");
canvas.height = windowHeight;
var ctx = canvas.getContext("2d");
var backgroundImage = document.getElementById("background");

var gameDetailsDisplayRectHeight = windowHeight * 0.08;


var gameShip = new Spaceship(canvas.width / 2, canvas.height - gameDetailsDisplayRectHeight - 100,2);
var gameDetails = new GameDetails(0, canvas.height - gameDetailsDisplayRectHeight, canvas.width, gameDetailsDisplayRectHeight);
var GameBoard = {Height : canvas.height - gameDetailsDisplayRectHeight, Width : canvas.width};
var objectManager = new GameObjectManager(GameBoard, gameShip);
var enemyGenerator = new EnemyGenerator(GameBoard, objectManager);

var Points = 0;
var wave = new Wave("Wave 1", GameBoard, 50, 5, objectManager,enemyGenerator);

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage,0, 0, canvas.width, canvas.height);
    wave.Draw(ctx);
    objectManager.Draw(ctx);
    gameDetails.Draw(ctx);
    
}

function Update(gameTime) {
    if(Keyboard.isKeyDown(Keyboard.keyCodes.E)) {
        wave.Start();
    }
    wave.Update();
    enemyGenerator.Update(gameTime, GameBoard);
    var pointsEarned = objectManager.Update(gameTime,GameBoard);

    gameDetails.UpdatePoints(pointsEarned);
}

var gameTime = 0;
function Play() {
    gameTime += 10;
    Update(gameTime);
    Draw();
}

setInterval(Play, 10);