var setup = util.setup();
var width = setup.width;
var height = setup.height;
var c = setup.context;


// Events

document.querySelector(".btn").addEventListener('click', function() {
    game.start();
});
document.querySelector("canvas").addEventListener('touchmove', function(event) {
    try {
        game.ship.move(event);
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

var game = new Game();

// Initialization

function init() {
    // initialize var
    game.ship = new Ship((width/2),(height-100),20);
    game.bullets = [];
    game.enemys = [];

    for(var i =1; i< 10; i++) {
        var radius = util.randomIntFromRange(5,30);

        var position = {
            x : util.randomIntFromRange(0+radius , width-radius),
            y : util.randomIntFromRange(-(height/2) ,0)
        }
        game.enemys.push(new Enemy(position,radius));
    }
}

// animation loop
var total_frames = 0;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    total_frames += 1;

    game.ship.update();

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
function info() {
    setInterval(function() {
        document.getElementById('fps').innerHTML = total_frames;
        total_frames = 0;
    },1000);
}
