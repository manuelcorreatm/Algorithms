/* LINKED LIST CODE */
function LinkedList(data, priority) {
    var head = new Node(data, priority);
    var pointer = head;

    //Node Constructor
    function Node(data, priority) {
        if (priority) {
            this.data = new LinkedList(data);
            this.priority = priority;
            this.next = null;
        } else {
            this.data = data;
            this.next = null;
        }
    }

    function hasNext() {
        return pointer.next ? true : false;
    }

    this.traverse = function (callback) {
        pointer = head;
        if (!head) {
            return;
        }
        while (hasNext()) {
            callback(pointer);
            pointer = pointer.next;
        }
        callback(pointer);
    }

    /* PRIORITY QUEUE CODE */
    this.add = function (data, priority) {
        pointer = head;
        //if empty, create the head
        if (!pointer) {
            head = new Node(data, priority);
            return;
        }
        //if a priority is given, traverse upper level queue
        if (priority) {
            //if priority is bigger than the first put it in the head
            if (pointer.priority < priority) {
                var temp = head;
                head = new Node(data, priority);
                head.next = temp;
            //if priority is equals to the head, just add the value to its own queue
            } else if (pointer.priority == priority) {
                pointer.data.add(data);
            //if priority is smaller than the head start traversing the queue
            } else {
                while (hasNext()) {
                    var oldPointer = pointer;
                    pointer = pointer.next;
                    //if priority is smaller than current node, insert the new priority before it
                    if (pointer.priority < priority) {
                        var temp = pointer;
                        pointer = new Node(data, priority);
                        pointer.next = temp;
                        oldPointer.next = pointer;
                        return;
                    //if priority is equals to current node, add the value to its own queue
                    } else if (pointer.priority == priority) {
                        pointer.data.add(data);
                        return;
                    }
                }
                //if this is the lowest priority then add it to the end
                pointer.next = new Node(data, priority);
            }
        } else {
            //if no priority is given, add the value to the end of the current priority queue
            while (hasNext()) {
                pointer = pointer.next;
            }
            pointer.next = new Node(data);
        }
    }

    this.remove = function () {
        pointer = head;
        //if there is no head, there is nothing to remove, return empty object
        if (!pointer) {
            console.log("Empty Queue");
            return {value: null, priority: null};
        }
        //if priority is present then it has to remove from inner queue
        if (pointer.priority) {
            var obj = pointer.data.remove();
            //if it was the last value, remove priority assigning new head
            if (obj.isEmpty) {
                if (hasNext) {
                    head = head.next;
                } else {
                    head = null;
                }
            }
            return { value: obj.value, priority: pointer.priority };
        //if priority is not present, remove first object from queue and return it
        } else {
            var value = head.data;
            var isEmpty = false;
            //check if the aren't any more elements in the queue, return that is empty
            if (hasNext()) {
                head = pointer.next;
            } else {
                isEmpty = true;
            }
            return { value: value, isEmpty: isEmpty };
        }
    }
}

/* TEST CASE */
var priorityQueue = new LinkedList("item 1", 15);
priorityQueue.add("item 2", 3);
priorityQueue.add("item 3", 3);
priorityQueue.add("item 4", 2);

priorityQueue.add("item 5", 20);
priorityQueue.add("item 6", 15);
priorityQueue.add("item 7", 18);
priorityQueue.add("item 8", 15);
priorityQueue.add("item 9", 4);

console.log("Removed: " + priorityQueue.remove().value);
console.log("Removed: " + priorityQueue.remove().value);
console.log("Removed: " + priorityQueue.remove().value);
console.log("Removed: " + priorityQueue.remove().value);
priorityQueue.add("item 10", 3);
priorityQueue.add("item 11", 3);
priorityQueue.add("item 12", 2);
console.log("Removed: " + priorityQueue.remove().value);
console.log("Removed: " + priorityQueue.remove().value);
console.log("Removed: " + priorityQueue.remove().value);
console.log("Removed: " + priorityQueue.remove().value);
priorityQueue.add("item 13", 20);
priorityQueue.add("item 14", 15);

console.log("-------------------");
console.log("Items Left on Queue");

priorityQueue.traverse(
    function (node) {
        console.log("Items with Priority: " + node.priority);
        node.data.traverse(
            function (node) {
                console.log("Value: " + node.data);
            });
    }
);
