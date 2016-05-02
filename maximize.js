function maximize(target) {
    if (target <= 1) return 0;
    if (target == 2) return 1;
    if (target == 3) return 2;
    var triples = Math.floor(target / 3);
    remainder = target % 3;

    if (remainder == 1) {
        --triples;
        remainder += 3;
    }

    if (remainder === 0) {
        return Math.pow(3, triples);
    } else {
        return Math.pow(3, triples) * remainder;
    }
}

console.log(maximize(20));