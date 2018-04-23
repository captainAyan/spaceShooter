var Game = function() {
	this.over = false;
	this.bullets = [];
	this.enemys = [];
	this.ship = undefined;
	this.point = 0;

	this.start = function() {
		if(!this.over) {
			this.reset();
			info()
			animate();
			document.querySelector('.btn-set').style.display = 'none';
		}
	}

	this.stop = function() {
		this.enemys.forEach(function(enemy) {
			enemy.dy = 0;
		});
		this.bullets.forEach(function(bullet) {
			bullet.dy = 0;
		});
    	document.getElementById('point').innerHTML = this.point +" game over";
	}

	this.reset = function() {
		enemys = undefined;
	    bullets = [];
	    ship = [];
	    this.point = 0;
	    this.over = false;
	    document.getElementById('point').innerHTML = 0;
	    init();
	}

	this.addPoint = function(size) {
    	(size <= 15 ? this.point+=2 : this.point+=5);
    	document.getElementById('point').innerHTML = this.point;
	}

}
