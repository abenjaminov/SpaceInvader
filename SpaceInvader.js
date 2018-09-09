var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var gameShip = new Spaceship(canvas.width / 2, canvas.height - 100,2);

var backgroundImage = document.getElementById("background");
var GameBoard = {Height : canvas.height, Width : canvas.width};
var objectManager = new GameObjectManager(GameBoard);

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage,0, 0, canvas.width, canvas.height);
    gameShip.Draw(ctx);
    objectManager.Draw(ctx);
}

function Update(gameTime) {
    objectManager.Update(gameTime,GameBoard);
    gameShip.Update(GameBoard, gameTime, objectManager);
}

var gameTime = 0;
function Play() {
    gameTime += 10;
    Update(gameTime);
    Draw();
}

setInterval(Play, 10);