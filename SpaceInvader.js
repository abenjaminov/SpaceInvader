var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var gameDetailsDisplayRectHeight = 60;

var gameShip = new Spaceship(canvas.width / 2, canvas.height - gameDetailsDisplayRectHeight - 100,2);

var gameDetails = new GameDetails(0, canvas.height - gameDetailsDisplayRectHeight, canvas.width, gameDetailsDisplayRectHeight);
var backgroundImage = document.getElementById("background");
var GameBoard = {Height : canvas.height - gameDetailsDisplayRectHeight, Width : canvas.width};
var objectManager = new GameObjectManager(GameBoard);
var Points = 0;

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage,0, 0, canvas.width, canvas.height);
    gameShip.Draw(ctx);
    objectManager.Draw(ctx);
    gameDetails.Draw(ctx);
}

function Update(gameTime) {
    var pointsEarned = objectManager.Update(gameTime,GameBoard);
    gameShip.Update(GameBoard, gameTime, objectManager);

    gameDetails.UpdatePoints(pointsEarned);
}

var gameTime = 0;
function Play() {
    gameTime += 10;
    Update(gameTime);
    Draw();
}

setInterval(Play, 10);