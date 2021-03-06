var Game = function() {
	this.over = false;
	this.bullets = [];
	this.enemys = [];
	this.stars = [];
	this.blasts = [];
	this.ship = undefined;
	this.point = 0;

	this.start = function() {
		if(!this.over) {
			this.reset();
			animate();
			document.querySelector('.btn-set').style.display = 'none';
			SETUP.canvas.style.cursor= "none";
		}
		util.sound.blast(0.0);
		util.sound.bg();
	}

	this.stop = function() {
		this.enemys.forEach(function(enemy) {
			enemy.dy = 0;
		});
		this.bullets.forEach(function(bullet) {
			bullet.dy = 0;
		});
		this.stars.forEach(function(star) {
			star.dy = 0;
		});
    	document.getElementById('point').innerHTML = this.point +" game over";
	}

	this.reset = function() {
		this.enemys = [];
	    this.bullets = [];
	    this.stars = [];
	    this.blasts = [];
	    this.ship = undefined;
	    this.point = 0;
		this.over = false;
		GLOBAL_WEIGHT = 1;
	    document.getElementById('point').innerHTML = 0;
	    init();
	}

	this.addPoint = function(size) {
    	(size <= 25 ? this.point+=2 : this.point+=5);
		document.getElementById('point').innerHTML = this.point;
		
		if((game.point % 30 >= 0) && (game.point % 30 <=5) && (game.point > 30) && GLOBAL_WEIGHT < 4) {
			GLOBAL_WEIGHT += 0.1;
        }
	}



}
