var Utility = function () {

	// Utility functions

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
			this.context = this.canvas.getContext('2d');
			this.screen = {
				width : window.innerWidth,
				height : window.innerHeight
			};

			document.querySelector('body').style.margin = "0px";
			document.querySelector('body').style.padding = "0px";
			this.canvas.height = this.screen.height;
			this.canvas.width = this.screen.width;

			// Disableing the javascript background, using css gradients currently
			//this.canvas.style.background = "#000";

			return {
				canvas:this.canvas,
				context:this.context,
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
}

// Creating a utility object so for static usage

const util = new Utility();
