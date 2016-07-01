﻿function numBaseConversion(num, base) {
    var quotient = num;
    var result = "";
    var symbols = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "A",
        "11": "B",
        "12": "C",
        "13": "D",
        "14": "E",
        "15": "F",
        "16": "G",
        "17": "H",
        "18": "I",
        "19": "J",
        "20": "K",
        "21": "L",
        "22": "M",
        "23": "N",
        "24": "Ñ",
        "25": "O",
        "26": "P",
        "27": "Q",
        "28": "R",
        "29": "S",
        "30": "T",
        "31": "U",
        "32": "V",
        "33": "W",
        "34": "X",
        "35": "Y",
        "36": "Z",
    };

    while (quotient !== 0) {
        result = symbols[Math.floor(quotient % base)] + result;
        quotient = Math.floor(quotient / base); 
    }

    return result;
}

console.log(numBaseConversion(23423423423, 26));