var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Update(gameTime) {
    
}

function Play() {
    Update();
    Draw();
}

setInterval(Play, 10);