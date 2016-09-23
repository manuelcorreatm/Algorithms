class SymMatrix {
    constructor (matrix) {
        this.array = [];
        this.rowLength = matrix.length - 1;
        for (let i = 1; i < matrix.length; i++) {
            for (let j = 0; j < i; j++) {
                this.array.push(matrix[i][j]);
            }
        }
    }

    getValue(x, y) {
        if (x > this.rowLength || y > this.rowLength) {
            console.log("Coordinate out of bounds");
            return;
        }
        if (x === y) {
            return 0;
        }
        if (x > y) {
            [x, y] = [y, x];
        }

        var index = 0;
        while (y) {
            index += --y;
        }

        return this.array[index+x];
    }
    
}

/*TEST CASE*/
var matrix = [
    [0, 5, 2, 6, 7],
    [5, 0, 3, 7, 8],
    [2, 3, 0, 4, 5],
    [6, 7, 4, 0, 9],
    [7, 8, 5, 9, 0]
];

var symMatrix = new SymMatrix(matrix);
console.log(symMatrix.array);
console.log(symMatrix.getValue(0,1));