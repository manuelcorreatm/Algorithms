//Added a second object to hold the unique values of the string;
function isFollowingPattern(pattern, str) {
    var words = str.split(" ");
    tokens = {};
    values = {};
    if (pattern.length != words.length) return false;
    for (var i = 0; i < pattern.length; i++) {
        if (!tokens[pattern[i]] && !values[words[i]]) {
            tokens[pattern[i]] = words[i];
            values[words[i]] = pattern[i];
        } else if (tokens[pattern[i]] != words[i]) {
            return false;
        }
    }
    return true;
}

var pattern = "abba";
var str = "cat hat hat cat";

console.log(isFollowingPattern(pattern, str));