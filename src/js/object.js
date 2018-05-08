/// All Classes


/**
 *
 * Ship class
 * 
 * @prop {float | int} x ship's x position.
 * @prop {float | int} y ship's y position.
 *
 */
function Ship(x,y) {
    this.position = {
        x:x,
        y:y
    }
    this.radius = 7;
    this.shipImage = document.getElementById('ship');

    // ship's flame
    this.flame = {
        // the image
        sprite : document.getElementById('flame'),
        // where on the sprite you want to draw
        sx : 0,
        sy : 0,
        // frame size
        sWidth : 728/3,
        sHeight : 258
    };

    this.currentFrame;

    this.draw = function() {
        // draw
        // flame
        c.drawImage(this.flame.sprite,this.flame.sx,this.flame.sy,this.flame.sWidth,this.flame.sHeight,this.position.x-15,this.position.y+25,30,30);
        // ship
        c.drawImage(this.shipImage, this.position.x-30, this.position.y-30, 60, 60);
    }

    this.update = function() {
        // update
        if (total_frames % 5 == 0) {
            this.currentFrame = total_frames % 3;
            this.flame.sx = this.currentFrame * this.flame.sWidth;
        }
        this.draw();
    }

    this.move = function(data,type) {
        try {
            if(type == "touch") {
                this.position.x = data.touches[0].clientX;
            }
            else if(type == "key") {
                this.position.x += data;
            }
        }
        catch(e) {}
    }
}


/**
 *
 * Bullet class
 * 
 * @prop {float | int} x bullet's x position.
 *
 */
function Bullet(x) {
    this.position = {
        x : x,
        y : HEIGHT-130
    }
    this.radius = 3;
    this.dy = 5;
    this.color = "#ff0";
    
    this.draw = function() {
        // draw
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    this.update = function() {
        // update
        this.position.y -= this.dy;
        this.draw();
    }
    util.sound.shoot();
}


/**
 *
 * enemy class
 *
 * @prop {object} position enemy's x and y position.
 * @prop {float | int} radius radius of enemy.
 *
 */
function Enemy(position,radius) {
    this.position = {
        x : position.x,
        y : position.y
    }

    this.radius = radius/2;
    this.dy = 0.1*this.radius;

    this.dim = {
        width: this.radius*2,
        height: this.radius*2
    }

    this.color = "#d5d5d5";

    this.images = [document.getElementById('ast_1'),document.getElementById('ast_2'),document.getElementById('ast_3')];
    this.asteroidImage = this.images[util.randomIntFromRange(0,2)];

    this.draw = function() {
        // draw
        c.drawImage(this.asteroidImage, this.position.x-(this.radius), this.position.y-(this.radius), this.dim.width, this.dim.height);
    }

    this.update = function() {
        // update        
        this.position.y += (this.dy*GLOBAL_WEIGHT);
        this.draw();
    }

    this.reset = function() {
        this.position.x = util.randomIntFromRange(0+this.radius , WIDTH-this.radius);
        this.position.y = util.randomIntFromRange(-(HEIGHT/2) ,0);
        this.asteroidImage = this.images[util.randomIntFromRange(0,2)];
        this.radius = (util.randomIntFromRange(20,70))/2;
        this.dim = {
            width: this.radius*2,
            height: this.radius*2
        }
        this.dy = 0.1*this.radius;

        this.update();
    }
}


/**
 * star class
 */

function Star() {
    this.radius = util.randomIntFromRange(100,200)/100;
    this.dr = 1;
    this.dy = this.radius /5;
    this.position = {
        x : util.randomIntFromRange(0 , WIDTH),
        y : util.randomIntFromRange(0 , HEIGHT)
    }

    this.draw = function() {
        // draw

        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = "white";
        c.fill();
        c.closePath();
    }
    this.update = function() {
        if(this.radius >= 2 || this.radius <= 1) {
            this.dr = -(this.dr);
        }
        this.radius += (this.dr/50);
        this.position.y += this.dy*5;
        if(this.position.y > HEIGHT) {
            this.position.x = util.randomIntFromRange(0 , WIDTH);
            this.position.y = -10;
        }
        this.draw();
    }
}

/**
 *
 * blast class
 *
 * @prop {object} position enemy's x and y position.
 * @prop {float | int} radius radius of enemy.
 *
 */
function Blast(pos,radius) {
    this.position = {
        x : pos.x,
        y : pos.y
    }
    this.radius = radius;

    this.finished = false;

    this.it = 5;

    this.explostion = {
        // the image
        sprite : document.getElementById('blast'),
        // where on the sprite you want to draw
        sx : 0,
        sy : 0,
        // frame size
        sWidth : 23040/90,
        sHeight : 256
    };

    util.sound.blast(1.0);

    this.draw = function() {
        // drawing the explosion
        c.drawImage(this.explostion.sprite,this.explostion.sx,this.explostion.sy,this.explostion.sWidth,this.explostion.sHeight,this.position.x-this.radius*2,(this.position.y-this.radius*2)+10,this.radius*4,this.radius*4);
    }

    this.update = function() {
        this.currentFrame = this.it % 90;
        this.explostion.sx = this.currentFrame * this.explostion.sWidth;
        this.draw();
        if (this.it <= 75) {
            this.it += 1
        }
        else {
            this.finished = true;
        }
    }
}