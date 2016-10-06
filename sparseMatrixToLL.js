class SparseMatrix {
    constructor(matrix) {
        this.map = new Map();
        this.columnLength = matrix.length - 1;
        this.rowLength = matrix[0].length - 1;

        for (let rowIndex in matrix) {
            for (let columnIndex in matrix[rowIndex]) {
                if (matrix[rowIndex][columnIndex]) {
                    if (!this.map.has(rowIndex)) {
                        this.map.set(rowIndex, new Map());
                    }
                    this.map.get(rowIndex).set(columnIndex, matrix[rowIndex][columnIndex]);
                }
            }
        }
    }

    getValue(x, y) {
        if (x > this.rowLength || y > this.columnLength) {
            console.log("Out of Bounds");
            return;
        }
        var row = this.map.get(y + "");
        if (row) {
            var column = row.get(x + "");
            if (column) {
                return column;
            }
        }
        return 0;
    }

    setValue(x, y, value) {
        if (x > this.rowLength || y > this.columnLength) {
            console.log("Out of Bounds");
            return;
        }
        var row = this.map.get(y + "");
        if (row) {
            var column = row.get(x + "");
            if (column) {
                if (!value) {
                    this.map.get(y + "").delete(x + "");
                    if (this.map.get(y + "").size === 0) {
                        this.map.delete(y + "");
                        return;
                    }
                } 
            } 
            this.map.get(y + "").set(x + "", value);
        } else {
            this.map.set(y, new Map());
            this.map.get(y).set(x, value);
        }
    }

    printMap() {
        var string = "";
        for (var [rowIndex, row] of this.map) {
            string += "Row: " + rowIndex + " => ";
            for (var [columnIndex, column] of row) {
                string += "[" + columnIndex + ", " + column + "]";
            }
            string += "\n";
        }
        return string;
    }
}

/*TEST CASE*/
var matrix = [
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var sparseMatrix = new SparseMatrix(matrix);
console.log(sparseMatrix.map);
console.log(sparseMatrix.getValue(2, 0));
console.log(sparseMatrix.getValue(3, 5));
sparseMatrix.setValue(3, 5, 4);
console.log(sparseMatrix.getValue(3, 5));
sparseMatrix.setValue(2, 0, 0);
console.log(sparseMatrix.printMap());
sparseMatrix.setValue(8, 7, 5);
console.log(sparseMatrix.printMap());