function findRoutesInMatrix(start, end) {
    //Matrix
    var row1 = [4, 6, 8, 9, 15, 25];
    var row2 = [1, 5, 6, 8, 2, 13];
    var row3 = [4, 7, 2, 1, 3, 8];
    var row4 = [11, 10, 2, 4, 9, 15];
    var row5 = [26, 71, 1, 10, 3, 7];
    var matrix = [row1, row2, row3, row4, row5];

    //Global Variables
    var routes = [];    //all the routes generated
    var leaps = [];     //number of routes generated to skip for each column so they can be used for modification
    var oldLength = 0;  //for beginning of routes to be modified
    var length = 0;     //for end of routes to be modified   

    //Validate if input is correct (end has to be greater than start, and within matrix bounds)
    if (start[1] < 0 || start[0] < 0) {
        console.log("Start coordinate out of bounds");
        return false;
    } else if (matrix.length <= end[1] || matrix[0].length <= end[0]) {
        console.log("End coordinate out of bounds");
        return false;
    } else if ((start[1] > end[1]) || (start[1] == end[1] && start[0] > end[0])) {
        console.log("End coordinate is before start coordinate");
        return false;
    } 
    
    //Start iterating through the matrix beginning from end row to start row
    for (var i = end[1]; i >= start[1] ; i--) {
        //Initialize variables
        var temp = [];
        var sum = length;
        var k = length;
        var l = 0;
        oldLength = length;
        length = routes.length;
        
        if (i == end[1]) {
            //if first visited row, then only push the "whole" row as a route
            routes.push(matrix[i].slice(start[0], end[0] + 1));
            //console.log(matrix[i].slice(start[0], end[0] + 1));
        }
        
        //Start iterating through the columns of the current row, from start column to end column
        for (var j = start[0]; j <= end[0]; j++) {
            //Initialize variables
            var route = [];
           
            //push the new element into temp route builder
            temp.push(matrix[i][j]);

            //Go through the last set of previously created routes
            for (var m = k; m < length; m++) {
                //Concatenate my current route to the previous routes to create the new routes
                route = temp.concat(routes[m].slice(l));
                routes.push(route);
                //console.log(route);
            }

            //Get the beginning of relevant routes to modify
            if (!leaps[l]) leaps[l] = 0;
            sum = sum - leaps[l];
            leaps[l] = sum;
            k = k + sum;
            l++;
        }
        leaps.unshift(oldLength);
        leaps.pop();
    }
    console.log("Number of routes: " + (routes.length - length));  //126 routes for whole matrix
    return routes.slice(length);
}

findRoutesInMatrix([0,0], [5,4]);