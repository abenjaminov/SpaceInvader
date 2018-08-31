var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var gameShip = new Spaceship(canvas.width / 2, canvas.height - 100,2);

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameShip.Draw(ctx);
}

function Update(gameTime) {
    gameShip.Update({Height : canvas.height, Width : canvas.width}, gameTime);
}

var gameTime = 0;
function Play() {
    gameTime += 10;
    Update(gameTime);
    Draw();
}

setInterval(Play, 10);