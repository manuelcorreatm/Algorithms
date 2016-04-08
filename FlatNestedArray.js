//Recursive function to flatten an array with nested arrays

var arr = [1,3,[2,[4,5],6],7,8];
var arr2 = [1,3,[2,[4,5],6],7,8];

function rflat(arr) {
    var arrlength = arr.length;
    for (var i = 0; i < arrlength; i++) {
       if( Array.isArray(arr[0])){
           arr = arr.concat(rflat(arr[0]));
       }
       else{
           arr.push(arr[0]);
       }
       arr.shift();
    }
    return arr;
}

rflat(arr);

//Iterative version

function iflat(arr){
	var temparray = arr;
	for(var i = 0; i < temparray.length; i++){
		if(temparray[i] instanceof Array) {
			temparray.splice.apply(temparray, [i, 1].concat(temparray[i]));
			i--;
		}
	}
	return temparray;
}

var flatArray = iflat([1, 3, [2, 4, [5, [], 6], 7, 8], 9]);
console.log(flatArray.toString());