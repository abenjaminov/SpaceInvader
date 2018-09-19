var Quarters = {
    "1" : {
        Start : 0,
        End : 0.5*Math.PI
    }, 
    "2" : {
        Start : 0.5*Math.PI,
        End : Math.PI
    },
    "3" : {
        Start : Math.PI,
        End : 1.5*Math.PI
    }, 
    "4" : {
        Start : 1.5*Math.PI,
        End : 2 * Math.PI
    }
}

var SpritesFolders = {
    explosion : "Sprites/explosion"
}

function IsInQuarters(Angle, quarters) {
    var isInQuarters = false;

    quarters.forEach(element => {   
        var quarter = Quarters[element];
        var newAngle = Angle % (Math.PI * 2);
        isInQuarters = isInQuarters || (quarter.Start <= newAngle && newAngle < quarter.End)
    });

    return isInQuarters;
}

function GetRandomNum(min, max) {
    return (Math.random() * max) + min;
}

function GetDirectionToPoint(DestinationPoint, OriginPoint) {
    return Math.atan2(DestinationPoint.Y - OriginPoint.Y, DestinationPoint.X - OriginPoint.X);
}