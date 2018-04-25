/// All Classes


/**
 * Ship class
 * 
 * @prop {float | int} x ship's x position.
 * @prop {float | int} y ship's y position.
 * @prop {float | int} radius ship's radius.
 *
 */
function Ship(x,y) {
    this.position = {
        x:x,
        y:y
    }
    this.radius = 7;
    this.color = "#d5d5d5";
    this.shipImage = document.getElementById('ship');

    // ship's flame
    this.flame = {
        // the image
        sprite : document.getElementById('flame'),
        // where on the sprite you want to draw
        sx : 0,
        sy : 0,
        // frame size
        sWidth : 242,
        sHeight : 258
    };

    this.currentFrame;

    this.draw = function() {
        // draw
        c.drawImage(this.shipImage, this.position.x-30, this.position.y-30, 60, 60);
        c.drawImage(this.flame.sprite,this.flame.sx,this.flame.sy,this.flame.sWidth,this.flame.sHeight,this.position.x-15,this.position.y+30,30,30);
    }

    this.update = function() {
        // update
        if (total_frames % 8 == 0) {
            this.currentFrame = ++total_frames % 3;
            this.flame.sx = this.currentFrame * this.flame.sWidth;
        }
        this.draw();
    }

    this.move = function(data,type) {
        if(!(this.position.x < 0 || this.position.x > width)) {
            if(type) {
                this.position.x = event.touches[0].clientX;
                //this.flame.cx = this.position.x-15;
            }
            else {
                this.position.x = event.clientX;
            }
        }
    }
}


/**
 * Bullet class
 * 
 * @prop {float | int} x bullet's x position.
 */
function Bullet(x) {
    this.position = {
        x : x,
        y : height-130
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
        this.draw()
    }
}


/**
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
        this.position.y += this.dy;
        this.draw();
    }

    this.reset = function() {
        this.position.x = util.randomIntFromRange(0+this.radius , width-this.radius);
        this.position.y = util.randomIntFromRange(-(height/2) ,0);
        this.asteroidImage = this.images[util.randomIntFromRange(0,2)];
        this.update();
    }
}


/**
 * starField class
 *
 */

function Star() {
    this.radius = util.randomIntFromRange(1,2);
    this.dr = 1;
    this.dy = this.radius /5;
    this.position = {
        x : util.randomIntFromRange(0 , width),
        y : util.randomIntFromRange(0 , height)
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
        this.position.y += this.dy;
        if(this.position.y > height) {
            this.position.x = util.randomIntFromRange(0 , width);
            this.position.y = -10;
        }
        this.draw();
    }
}
