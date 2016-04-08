function crosses(stream) {
	var survivors = [];


	(function recurse (stream) {
		var biggest = 0;
		var biggestFish = {};

		for (var i = 0; i < stream.length; i++) {
			if (stream[i].size > biggest) {
				biggest = stream[i].size;
				biggestFish = stream[i];
				console.log(biggestFish.size);
			}
		}
		
		if (biggestFish.direction > 0){
			for (i = 0; i < stream.length; i++) {
				if ((stream[i].direction < 0) && 
					(stream[i].size < biggestFish.size) && 
					(stream[i].position > biggestFish.position)){
					stream.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < stream.length; i++) {
				if ((stream[i].direction > 0) && 
					(stream[i].size < biggestFish.size) && 
					(stream[i].position < biggestFish.position)){
					stream.splice(i, 1);
				}
			}
		}
		var index = stream.indexOf(biggestFish);
		survivors.push(stream.splice(index, 1));
		console.log(biggestFish);
		if (stream.length !== 0) {
			recurse(stream);
		}
		
	})(stream);
	
	return survivors;
}

function Fish (position, direction, size) {
	this.position = position; //position on the stream
	this.direction = direction; //1 is right, -1 is left
	this.size = size //positive integer with size
}

var fish1 = new Fish (1, 1, 2);
var fish2 = new Fish (2, 1, 6);
var fish3 = new Fish (3, -1, 3);
var fish4 = new Fish (4, -1, 4);
var fish5 = new Fish (5, -1, 7);
var fish6 = new Fish (6, 1, 1);


stream = [fish1, fish2, fish3, fish4, fish5, fish6];

console.log(crosses(stream));