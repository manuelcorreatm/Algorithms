function Lex(word) {
    this.word = word;
    this.bifurcations = [];
    this.index = 0;

    this.getNextToken = function () {
        return this.word[this.index++]; // token
    };
    this.storeBifurcation = function () {
        this.bifurcations.push(this.index - 1); //store index before consuming
    };
    this.hasBifurcation = function () {
        return this.bifurcations.length;
    }
    this.goBackToBifurcation = function () {
        this.index = this.bifurcations.pop(); //restablishes index at bifurcation
        return this.getNextToken();
    };
}


function Parser(word1, word2, word3) {
    this.word1 = word1;
    this.word2 = word2;
    this.word3 = word3;

    this.findInterleaved = function () {
        var lex1 = new Lex(word1);
        var lex2 = new Lex(word2);
        var lex3 = new Lex(word3);


        if (word3.length == (word1.length+word2.length)) {
            var token1 = lex1.getNextToken();
            var token2 = lex2.getNextToken();
            var token3 = lex3.getNextToken();

            while (token3) {
                //console.log(token1 + "" + token2 + "" + token3)
                if (token3 == token1 && token3 == token2) {
                    //consume one but save this point in time
                    //console.log("Can consume on both strings, store this point and consume from String A");
                    lex1.storeBifurcation();
                    lex2.storeBifurcation();
                    lex3.storeBifurcation();

                    token1 = lex1.getNextToken();
                    token3 = lex3.getNextToken();

                } else if (token3 == token1) {
                    //check on one string
                    //console.log("Consume from String A");
                    token1 = lex1.getNextToken();
                    token3 = lex3.getNextToken();
                } else if (token3 == token2) {
                    //check on the other string
                    //console.log("Consume from String B");
                    token2 = lex2.getNextToken();
                    token3 = lex3.getNextToken();
                } else if (lex3.hasBifurcation()) {
                    //Is not in currentToken1 or 2, check if you can change path
                    //deconsume until you reach the bifurcation
                    //console.log("Return to bifurcation and consume from String B");
                    token1 = lex1.goBackToBifurcation();
                    token2 = lex2.goBackToBifurcation();
                    token3 = lex3.goBackToBifurcation();

                    token2 = lex2.getNextToken();
                    token3 = lex3.getNextToken();
                } else {
                    //It is not interleaved. Return false.
                    console.log("not interleaved");
                    return false;
                }
            }
            console.log("They are interleaved");
            return true;
        } else {
            //It is not interleaved. Return false.
            console.log("not interleaved");
            return false;
        }

        

    }
}

var parser1 = new Parser("abddac", "acdxyz", "abacdddxaycz");
var parser2 = new Parser("xxxb", "xxxca", "xxxcxxxba");
var parser3 = new Parser("bac", "bacd", "babacdc");
parser1.findInterleaved();
parser2.findInterleaved();
parser3.findInterleaved();