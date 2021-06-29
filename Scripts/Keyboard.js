var Keyboard = {
    keyCodes : {
        Space : 32,
        LeftArrow : 37,
        UpArrow : 38,
        RightArrow : 39,
        DownArrow : 40,
        E : 69
    },
    keysDown : [],
    isKeyDown : function(keyCode) {
        return this.keysDown[keyCode];
    }
}

function keyDownHandler(e) {
    Keyboard.keysDown[e.keyCode] = true;
}

function keyUpHandler(e) {
    Keyboard.keysDown[e.keyCode] = false;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);