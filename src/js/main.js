// setting up canvas and constants

const SETUP = util.setup();
const WIDTH = SETUP.width;
const HEIGHT = SETUP.height;
var c = SETUP.canvas.getContext("2d");

// creating constant game object
var game = new Game();

var total_frames = 0;

var GLOBAL_WEIGHT = 1;

// Events

document.querySelector("canvas").addEventListener('touchmove', function(event) {
    try {
        game.ship.move(event,"touch");
    }
    catch(e) {}
});

document.querySelector("canvas").addEventListener('click',function(event) {
    if(game.over) {
        game.reset();
    }
    else {
        try {
            game.bullets.push(new Bullet(game.ship.position.x));
        }
        catch(e) {}
    }
});

document.onkeydown = function(e) {
    /* Key controller
     * a - to move left
     * s - to move right
     * space - to shoot bullets
     */
    if(e.keyCode == 65) { // a
        game.ship.move(-5,"key");
    }
    else if(e.keyCode == 83) { // s
        game.ship.move(5,"key");
    }
    else if(e.keyCode == 32) { // space
        game.bullets.push(new Bullet(game.ship.position.x));
    }
}

// Real code for the game
// Initialization

function init() {
    // initialize var
    game.bullets = [];
    game.enemys = [];
    game.stars = [];
    game.blasts = [];

    for(var i = 0; i<20; i++) {
        game.stars.push(new Star(position));
    }

    for(var i =0; i<5; i++) {
        var radius = util.randomIntFromRange(20,70);

        var position = {
            x : util.randomIntFromRange(0+radius , WIDTH-radius),
            y : util.randomIntFromRange(-(HEIGHT) ,0)
        }
        game.enemys.push(new Enemy(position,radius));
    }

    game.ship = new Ship((WIDTH/2),(HEIGHT-100));
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, WIDTH, HEIGHT);
    total_frames += 1;

    game.stars.forEach((star)=> {
        star.update();
    });

    game.bullets.forEach((bullet,i)=> {
        if(bullet.position.y > 0) {
            game.enemys.forEach(function(enemy) {
                if(util.hits(bullet,enemy)) {
                    game.addPoint(enemy.radius);
                    game.blasts.push(new Blast(enemy.position,enemy.radius));
                    enemy.reset();
                    game.bullets.splice(i, 1);
                }
            });
            bullet.update();
        }
        else {
            game.bullets.splice(i, 1);
        }
    });

    game.ship.update();

    game.enemys.forEach((enemy)=> {
        if (enemy.position.y > HEIGHT+enemy.radius) {
            enemy.reset();
        }
        else if(util.hits(enemy,game.ship)) {
            game.over = true;
            game.stop();
            enemy.update();
        }
        else {
            enemy.update();
        }
    });

    game.blasts.forEach((blast,i)=> {
        if (blast.finished) {
            game.blasts.splice(i,1);
        }
        else {
            blast.update();
        }
    });
}
