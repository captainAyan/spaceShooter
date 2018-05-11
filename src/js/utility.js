var Utility = function () {

	// Utility functions

	/**
	 * debugger
	 *
	 * -- debugger is object which takes dom object --
	 *
	 * @param {object} dom object.
	 * @return {null}
	 *
	 */
	var Debugger = function(dom) {
		this.object = dom;
		this.log = function(data) {
			this.object.innerHTML = this.object.innerHTML + "<br>" + data;
		}
	}

	this.debugger = new Debugger(document.querySelector('#debugger'));

	/**
	 * setup
	 *
	 * -- Sets up canvas and document for the game --
	 *
	 * @return {null}
	 *
	 */

	this.setup = function() {
		try {
			this.canvas = document.querySelector('canvas');
			this.screen = {
				width : window.innerWidth,
				height : window.innerHeight
			};

			document.querySelector('body').style.margin = "0px";
			document.querySelector('body').style.padding = "0px";
			this.canvas.height = this.screen.height;
			this.canvas.width = this.screen.width;

			return {
				canvas:this.canvas,
				width:this.screen.width,
				height:this.screen.height
			};
		}
		catch(e) {
			console.log("cannot setup screen.");
			console.log(e);
		}
	}

	/**
	 * randomIntFromRange
	 *
	 * -- Gives a random number --
	 *
	 * @param {int} min bullet's x and y position.
	 * @param {int} max radius of enemy.
	 *
	 * @return {int}
	 *
	 */

	this.randomIntFromRange = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}


	/**
	 * distance
	 *
	 * -- Gives distance between two points --
	 *
	 * @param {int | float} x1 x coordinate of point 1.
	 * @param {int | float} y1 y coordinate of point 1.
	 * @param {int | float} x2 x coordinate of point 2.
	 * @param {int | float} x2 x coordinate of point 2.
	 *
	 * @return {int | float}
	 *
	 */

	this.distance = function(x1, y1, x2, y2) {
	    var xDist = x2 - x1;
	    var yDist = y2 - y1;

	    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
	}


	/**
	 * hits
	 *
	 * -- Checks if two circles collide --
	 *
	 * @param {object} a first object.
	 * @param {object} b second object.
	 * @return {boolean} 
	 *
	 */

	this.hits = function(a,b) {
	    var x1 = a.position.x;
	    var y1 = a.position.y;
	    var x2 = b.position.x;
	    var y2 = b.position.y;

	    var dist = this.distance(x1,y1,x2,y2);
	    var sum_radius = a.radius + b.radius;

	    return (dist - sum_radius) < 0
	}

	/**
	 * sound
	 *
	 * -- Makes sounds --
	 */
	var Sound = function() {
		/* audio setups */

		// -- shoot sound --
		var shoot = new Audio();
		shoot.src = "assets/sound/shoot.wav";
		// -- blast sound --
		var blast = new Audio();
		blast.src = "assets/sound/blast.ogg";
		// -- bg music --
		var bg = new Audio();
		bg.src = "assets/sound/bg.ogg";
		bg.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);


		// -- Preloader --
		/* This preloader was required to load all audios before the game starts */
		this.preloader = function() {
			bg.load();
			shoot.load();
			blast.load();

			this.preload_check = () => {
				if(!((shoot.readyState == 4) && (blast.readyState == 4) && (bg.readyState == 4))) {
					setTimeout(this.preload_check,1000);
				}
				else {
					document.getElementsByClassName('btn-set')[0].style.display = "block";
					document.getElementsByClassName('btn-set')[1].style.display = "none";
				}
			}
			this.preload_check();
		}

		/* player functions */
		// --shoot sound player --
		this.shoot = function() {
		   	shoot.play();
		}
		// -- blast sound player --
		this.blast = function(vol) {
			blast.volume = vol;
			blast.pause();
			blast.currentTime = 0;
			blast.play();
		}
		// -- bg music player --
		this.bg = function() {
			bg.play();
		}
	}
	this.sound = new Sound();
	
}

// Creating a utility object

const util = new Utility();
