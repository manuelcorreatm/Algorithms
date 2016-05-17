function findNumberof2s(N) {
    var result = 0;
    var multiplier = Math.floor(N / 10);
    var remainder = N % 10;
    var i = 1;
    var zero = 0;
    while (zero < 2) {
        currentDigit = Math.floor(remainder / i);
        if (currentDigit > 2) {
            multiplier++;
        } else if (currentDigit == 2) {
            //check right side of N
            remainder = (remainder % i) + 1;
            multiplier = multiplier + (remainder / i);
        }
        result += multiplier * i;

        i = i * 10;
        multiplier = Math.floor(N / (i*10));
        remainder = N % (i * 10);
        if (multiplier === 0) zero++;
    }
    return result;
}

console.log(findNumberof2s(1000)); //(0)1000+(1)100+(10)10+(100)1 = 300
console.log(findNumberof2s(234)); //(0)1000+(0.35)100+(3)10+(24)1 = 89
console.log(findNumberof2s(1234)); //(0)1000+(1.35)100+(13)10+(124)1 = 389
console.log(findNumberof2s(4039)); //(0)10000+(1)1000+(4)100+(41)10+(404)1 = 2214
console.log(findNumberof2s(23)); //(0)100+(0.4)10+(3)1 = 7 
console.log(findNumberof2s(22)); //(0)100+(0.3)10+(3.0)1= 5 should be 6
console.log(findNumberof2s(12)); //()100+(0)10+(2.0)1= 1 should be 2;
console.log(findNumberof2s(20)); //()100+(0.1)10+(2)1= 3;
console.log(findNumberof2s(21)); //()100+(0.2)10+(2)1= 4;
//when im bigger than two add 1 to multiplier
//when in 2 put a dot and check the right side
//take that number and add 1 to remainder
//multiply by the current round and add it to the result

