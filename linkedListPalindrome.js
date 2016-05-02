/* LINKED LIST CODE */
function LinkedList(root) {
    this.head = new Node();
    this.pointer = this.head;
    this.addNode(root);
}

function Node(data) {
    this.data = data;
    this.next = null;
}

LinkedList.prototype.hasNext = function () {
    return this.pointer.next ? true : false;
};

LinkedList.prototype.traverse = function (callback) {
    this.pointer = this.head;
    while (this.hasNext()) {
        this.pointer = this.pointer.next;
        callback(this.pointer);
    }
};

LinkedList.prototype.addNode = function (node) {
    this.pointer = this.head;
    while (this.hasNext()) {
        this.pointer = this.pointer.next;
    }
    this.pointer.next = node;
};

/* PALINDROME CODE */
LinkedList.prototype.isPalindrome = function () {
    this.pointer = this.head;
    var word = [];
    var isit = true;
    function check(pointer) {
        if (pointer.next) {
            word.push(pointer.next.data);
            //console.log(word);
            check(pointer.next);
        }
        if (pointer.data != word.shift()) {
            isit = false;
        }
    }

    check(this.pointer);
    return isit;
};

/* TEST CASE */
var node1 = new Node(1);
var node2 = new Node(3);
var node3 = new Node(5);
var node4 = new Node(3);
var node5 = new Node(1);
var llist = new LinkedList(node1);
llist.addNode(node2);
llist.addNode(node3);
llist.addNode(node4);
llist.addNode(node5);

console.log(llist.isPalindrome());