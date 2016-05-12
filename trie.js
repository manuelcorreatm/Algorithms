function Node(character) {
    this.character = character;
    this.value = null;
    this.children = {};
}

function Trie() {
    var node = new Node("");
    this._root = node;
}

Trie.prototype.addWord = function (word) {
    (function goNext(currentNode, subword) {
        if (subword.length > 1) {
            if (currentNode.children[subword[0]]) {
                goNext(currentNode.children[subword[0]], subword.substr(1));
            } else {
                goNext(currentNode.children[subword[0]] = new Node(subword[0]), subword.substr(1));
            }
        } else if (subword.length == 1) {
            if (!currentNode.children[subword[0]]) currentNode.children[subword[0]] = new Node(subword[0]);
            currentNode.children[subword[0]].value = word;
        }
    })(this._root, word);
}

Trie.prototype.contains = function (word) {
    return (function goNext(currentNode, subword) {
        if (currentNode.children[subword[0]]) {
            if (subword.length > 1) {
                return goNext(currentNode.children[subword[0]], subword.substr(1));
            } else if (subword.length == 1) {
                return currentNode.children[subword[0]].value == word;
            }
        }
        return false;
        
    })(this._root, word);
}

Trie.prototype.getWords = function () {
    var arr = [];
    (function goNext(currentNode) {
        for (var key in currentNode.children) {
            if (currentNode.children[key].value) arr.push(currentNode.children[key].value);
            goNext(currentNode.children[key]);
        }
    })(this._root);
    return arr;
}

var trie = new Trie();
trie.addWord("man");
trie.addWord("many");
trie.addWord("hello");
console.log(trie.contains("hello"));
console.log(trie.getWords());
console.log(trie);