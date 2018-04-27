// setting up canvas and constants

const setup = util.setup();
const width = setup.width;
const height = setup.height;
const canvas = setup.canvas;
const c = setup.context;

// creating constant game object
const game = new Game();

var total_frames = 0;

// Events

document.querySelector("canvas").addEventListener('touchmove', function(event) {
    try {
        game.ship.move(event,true);
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


// Real code for the game
// Initialization

function init() {
    // initialize var
    game.bullets = [];
    game.enemys = [];
    game.stars = []

    for(var i = 0; i<30; i++) {
        game.stars.push(new Star(position));
    }

    for(var i =0; i<5; i++) {
        var radius = util.randomIntFromRange(20,70);

        var position = {
            x : util.randomIntFromRange(0+radius , width-radius),
            y : util.randomIntFromRange(-(height) ,0)
        }
        game.enemys.push(new Enemy(position,radius));
    }

    game.ship = new Ship((width/2),(height-100));
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    total_frames += 1;

    game.stars.forEach((star)=> {
        star.update();
    });

    game.bullets.forEach(function(bullet,i) {
        if(bullet.position.y > 0) {
            game.enemys.forEach(function(enemy) {
                if(util.hits(bullet,enemy)) {
                    game.addPoint(enemy.radius);
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

    game.enemys.forEach(function(enemy) {
        if (enemy.position.y > height+enemy.radius) {
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
}
    
// info reporting
var last_fps = 0;
function info() {
    setInterval(function() {
        document.getElementById('fps').innerHTML = total_frames - last_fps;
        last_fps = total_frames;
    },1000);
}
