//Is wrong because it is not supposed to accept same value for different token
function isFollowingPattern(pattern, str) {
    var words = str.split(" ");
    obj = {};
    if (pattern.length != words.length) return false;
    for (var i = 0; i < pattern.length; i++) {
        if (obj[pattern[i]]) {
            if (obj[pattern[i]] != words[i]) {
                return false;
            }
        } else {
            obj[pattern[i]] = words[i];
        }
    }
    return true;
}


var pattern = "aaab";
var str = "cat cat cat hat";

console.log(isFollowingPattern(pattern, str));