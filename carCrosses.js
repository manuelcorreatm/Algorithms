function crosses(street) {
	var collisions = 0;
	for (var i = 0; i < street.length; i++) {
		if (street[i].direction == 1){
			for (var j = i+1; j < street.length; j++) {
				if ((street[j].direction == -1) && (street[i].position < street[j].position)) {
					collisions++;
				}
			}
		}
	}
	console.log(collisions);
}

function Car (position, direction) {
	this.position = position; //position on the street
	this.direction = direction; //1 is right, -1 is left
}

var car1 = new Car (1, 1);
var car2 = new Car (4, 1);
var car3 = new Car (2, -1);
var car4 = new Car (3, 1);
var car5 = new Car (5, -1);

street = [car1, car2, car3, car4, car5];

crosses(street);