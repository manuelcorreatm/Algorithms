var A = 'abcdezrzraaazqqjj';
var B = 'vwxyzkbkbaaaxqqqq';
var C = 'avbwcxdyzezkbkrzrbaaaaxaazqqqqjqjq';

function isInterleave(A, B, C) {

    var lenA = A.length;
    var lenB = B.length;
    var lenC = C.length;

    if (lenC != lenA + lenB) return false;

    var dp = (function () {
        var cache = [];
        return {
            get: function (x, y) {
                var row = cache[x] || (cache[x] = []);
                return row[y] === undefined ? (row[y] = -1) : row[y];
            },
            set: function (x, y, val) {
                var row = cache[x] || (cache[x] = []);
                row[y] = val;
                return val;
            },
            all: cache
        };
    })();

    function fun(l1, l2) {
        var l3 = l1 + l2;
        if (l3 == lenC) return true;

        if (dp.get(l1, l2) != -1) return dp.get(l1, l2);
        var x = false;
        if (l2 < lenB && C[l3] == B[l2])
            x = fun(l1, l2 + 1);
        if (!x && l1 < lenA && C[l3] == A[l1])
            x = fun(l1 + 1, l2);
        return dp.set(l1, l2, x);
    }

    return fun(0, 0);
}

isInterleave(A, B, C);