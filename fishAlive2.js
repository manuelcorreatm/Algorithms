function whoops(stream, alive){
	(function fight(currentFish){
		var position = stream.indexOf(currentFish);
		console.log(position);
		if (position < 0) {
			return;
		}
		if (currentFish.direction > 0) {
			if (position == stream.length-1){
				alive.push(stream.splice(position,1)[0]);
				console.log("im alive");
				//console.log(stream.length-1);
				fight(stream[stream.length-1]);
			} else {
				var nextFish = stream[position + 1];
				console.log("lets fight");
				//console.log(stream);
			}
		} else {
			if (position === 0){
				alive.push(stream.splice(position,1)[0]);
				console.log("im alive");
				//console.log(stream);
				fight(stream[0]);
			} else {
				var nextFish = stream[position - 1];
				console.log("lets fight");
				//console.log(stream);
			}
		}

		if (stream.length < 2) {
			if (stream.length == 1) {
				alive.push(stream.splice(position,1)[0]);
				console.log("im alive");
			}
			return;
		} else {
			if (currentFish.direction == nextFish.direction){
				console.log("you are my buddy");
				fight(nextFish);
			} else {
				if(currentFish.size > nextFish.size){
					nextFish.dead = true;
					console.log("I ate you!!");
					stream.splice(stream.indexOf(nextFish), 1);
					fight(currentFish);
				} else {
					currentFish.dead = true;
					console.log("you ate me :(");
					stream.splice(stream.indexOf(currentFish), 1);
					fight(nextFish);

				}
			}
		}
				
	})(stream[0]);
	console.log(alive);
	return alive.length;
}


function Fish (direction, size) {
	//this.position = position; //position on the stream
	this.direction = direction; //1 is right, -1 is left
	this.size = size; //positive integer with size
	this.dead = false;
}

var fish1 = new Fish (1, 2);
var fish2 = new Fish (1, 6);
var fish3 = new Fish (1, 9);
var fish4 = new Fish (-1, 8);
var fish5 = new Fish (-1, 7);
var fish6 = new Fish (1, 1);


var stream = [fish1, fish2, fish3, fish4, fish5, fish6];
var alive = [];
console.log("How many survived the massacre : " + whoops(stream, alive));