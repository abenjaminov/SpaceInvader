var windowHeight = window.innerHeight;

var canvas = document.getElementById("gameCanvas");
canvas.height = windowHeight;
var backgroundImage = document.getElementById("background");
var ctx = canvas.getContext("2d");
var Points = 0;

var game = new Game(canvas);

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage,0, 0, canvas.width, canvas.height);
    game.Draw(ctx);
}

var gameTime = 0;
function Play() {
    gameTime += 10;
    game.Update(gameTime);
    Draw();
}

setInterval(Play, 10);