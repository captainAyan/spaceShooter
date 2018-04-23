/// All Classes

/**
 * Ship class
 * 
 * @prop {float | int} x ship's x position.
 * @prop {float | int} y ship's y position.
 * @prop {float | int} radius ship's radius.
 *
 */
function Ship(x,y,radius) {
    this.position = {
        x:x,
        y:y
    }
    this.radius = radius;
    this.color = "#d5d5d5";
    
    this.draw = function() {
        // draw
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        c.moveTo(this.position.x, this.position.y);
        c.lineTo(this.position.x, this.position.y-(this.radius*2));
        c.lineWidth = 5;
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    this.update = function() {
        // update        
        this.draw();
    }

    this.move = function() {
        if(!(this.position.x < 0 || this.position.x > width)) {
            this.position.x = event.touches[0].clientX;
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
        y : height-100
    }
    this.radius = 3;
    this.dy = 5;
    this.color = "#f00";
    
    this.draw = function() {
        // draw
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    this.update = function() {
        // update
        this.position.y -= this.dy;
        this.draw()
    }
}


/**
 * Bullet class
 *
 * @prop {object} position bullet's x and y position.
 * @prop {float | int} radius radius of enemy.
 */
function Enemy(position,radius) {
    this.position = {
        x : position.x,
        y : position.y
    }
    this.dy = (radius*1.3)/10;
    this.color = "rgba(255,255,255,0.7)";
    this.radius = radius;
    
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
        this.position.y += this.dy;
        this.draw();
    }

    this.reset = function() {
        this.position.x = util.randomIntFromRange(0+radius , width-radius);
        this.position.y = util.randomIntFromRange(-(height/2) ,0);
        this.radius = util.randomIntFromRange(5,30);
        this.dy = (this.radius*1.3)/10;
        this.update();
    }
}
