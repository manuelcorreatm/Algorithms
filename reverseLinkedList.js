/* LINKED LIST CODE */
function LinkedList(root) {
    this.head = new Node(root);
    this.pointer = this.head;
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
        callback(this.pointer);
        this.pointer = this.pointer.next;
    }
    callback(this.pointer);
};

LinkedList.prototype.addNode = function (node) {
    this.pointer = this.head;
    while (this.hasNext()) {
        this.pointer = this.pointer.next;
    }
    this.pointer.next = node;
};

/* Reverse Code */
LinkedList.prototype.reverse = function () {
   /*
    this.pointer = this.head;
    var oldNext = this.pointer.next;
    this.pointer.next = null;

    if (oldNext) {
        this.pointer = oldNext;
    } else {
        return;
    }
    */
    this.pointer = this.head;
    var oldHead = null;
    var oldNext = null;

    while (this.hasNext()) {
        oldNext = this.pointer.next;
        this.pointer.next = oldHead;
        oldHead = this.pointer;
        this.pointer = oldNext;

        /*
        var oldHead = this.head;
        oldNext = this.pointer.next;
        this.head = this.pointer;
        this.pointer.next = oldHead;
        this.pointer = oldNext;
        */
    }

    this.pointer.next = oldHead;
    this.head = this.pointer;

    /*
    oldHead = this.head;
    this.head = this.pointer;
    this.pointer.next = oldHead;
    */
    //return;
}

/* TEST CASE */
var node1 = new Node(2);
var node2 = new Node(3);
var node3 = new Node(5);
var node4 = new Node(7);
var node5 = new Node(11);
var llist = new LinkedList(1);
llist.addNode(node1);
llist.addNode(node2);
llist.addNode(node3);
llist.addNode(node4);
llist.addNode(node5);
llist.reverse(llist);
llist.traverse(function (value) { console.log(value.data); });
//console.log(llist);