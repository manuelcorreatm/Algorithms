var number = 25;
var combinations = [];
var numberOfCombinations = [];
var chain;

function getArray(number) {
    var arr = [];
    while (number !== 0) {
        arr.push(number%10);
        number = Math.floor(number/10);
    }

    return arr;

}

function getCombinations() {
    if (arr.length == 1) {
        combinations.push([arr[0]]);
        console.log(combinations);
        console.log("Number of Combinations: "+1);
        return;
    } else {
        num1 = arr[0];
        num2 = arr[1];
        if ((num1+(num2*10)) < 27){
   
            combinations.push([arr[0]]);
            combinations.push([arr[0]+(arr[1]*10)]);
            combinations.push([arr[1], arr[0] ]);
            numberOfCombinations.push(1);
            numberOfCombinations.push(2);
            //return;
        } else {
            combinations.push([arr[0]]);
            combinations.push([arr[1], arr[0]]);
            numberOfCombinations.push(1);
            numberOfCombinations.push(1);
            //console.log(combinations);
            //console.log("Number of Combinations: "+1);
            //return;
        }
        
        if (arr.length == 1){
            return;
        }
        
    var num1 = arr[1];
    for (j = 2; j < arr.length ; j++) {
        arr2 = [];
        var num2 = arr[j];
        var num3 = num1 + (num2*10);
        if (num3 < 27) {
            //console.log(num3);
            if (num1 === 0){
                chain++;
            } else {
                chain = 1;
            }

            //get starting point
            start = 0;
            for (i = 0 ; i < (j-2); i++) {
                start = start + numberOfCombinations[i];
            }
            //console.log(start);
            
            //chains
            numComb1 = numberOfCombinations.pop();
            numComb2 = numberOfCombinations.pop();
            numberOfCombinations.push(numComb2);
            numberOfCombinations.push(numComb1);
            //console.log(numberOfCombinations);
            
            
            //make new combinations from the older ones.
            newNumComb = 0;
            for (k = 0; k < numComb2; k++) {
                newComb = [];
                newComb.push(num3);
                for (l = 0 ; l < combinations[start+k].length ; l++) {
                    newComb.push(combinations[start+k][l]);
                }
                combinations.push(newComb);
                newNumComb++;
            }
            for (m = 0; m < numComb1; m++) {
                newComb = [];
                newComb.push(num2);
                for (l = 0 ; l < combinations[start+numComb2+m].length ; l++) {
                    newComb.push(combinations[start+numComb2+m][l]);
                }
                //combinations.push([num2, combinations[start+numComb2+m]]);
                combinations.push(newComb);
                newNumComb++;
            }
            numberOfCombinations.push(newNumComb);
        } else {
            //console.log(num3);
            start = 0;
            //get starting point
            for (i = 0 ; i < (j-1); i++) {
                start = start + numberOfCombinations[i];
            }
            //console.log(start);
            
            //chains
            numComb1 = numberOfCombinations.pop();
            numComb2 = numberOfCombinations.pop();
            numberOfCombinations.push(numComb2);
            numberOfCombinations.push(numComb1);
            //console.log(numberOfCombinations);
            
            
            //make new combinations from the older ones.
            newNumComb = 0;
            for (m = 0; m < numComb1; m++) {
                newComb = [];
                newComb.push(num2);
                for (l = 0 ; l < combinations[start+m].length ; l++) {
                    newComb.push(combinations[start+m][l]);
                }
                combinations.push(newComb);
                newNumComb++;
            }
            numberOfCombinations.push(newNumComb);
            
        }
        //console.log(combinations);
        num1 = num2;
    }
    numComb = numberOfCombinations.pop()
    for (i=0;i<numComb;i++){
        console.log(combinations.pop());
    }
    console.log("Number of Combinations: "+numComb);
    }
}
var arr = getArray(number);

getCombinations();