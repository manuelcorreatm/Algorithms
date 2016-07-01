function reverseInSegments(fullArray, lengthOfSegment) {
    if (lengthOfSegment < 2) return;
    if (lengthOfSegment > fullArray.length) {
        fullArray.reverse();
        return;
    }
    
    var j = -1;
    var temp;
    var remainders = fullArray.length % lengthOfSegment;
    for (var i = 0; i < fullArray.length; i++) {
        if (j < 0) {
            if ((fullArray.length - i) == remainders) {
                j = remainders - 1;
            } else {
                j = lengthOfSegment - 1;
            }
        } 
        temp = fullArray.splice(j--, 1);
        fullArray.push(temp[0]);
    }

}

fullArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
reverseInSegments(fullArray, 15);
console.log(fullArray);