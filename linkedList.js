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

LinkedList.prototype.reverse = function () {
    this.pointer = this.head;
    var oldHead = null;
    var oldNext = null;

    while (this.hasNext()) {
        oldNext = this.pointer.next;
        this.pointer.next = oldHead;
        oldHead = this.pointer;
        this.pointer = oldNext;
    }

    this.pointer.next = oldHead;
    this.head = this.pointer;
}