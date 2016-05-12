function isPermutation(champion, challenger) {
    if (champion.length != challenger.length) return false;
    return champion.split('').sort().join('') == challenger.split('').sort().join('');
}

function isPermutation2(champion, challenger) {
    if (champion.length != challenger.length) return false;
    
}

console.log(isPermutation("abc123s", "a3b2c1s"));