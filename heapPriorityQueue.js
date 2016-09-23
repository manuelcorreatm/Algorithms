class Heap extends Array {
    constructor(...z) {
        super(...z);
        this.order();
    }

    order() {
        let self = this;
        (function recurse(index) {
            let temp;
            let leftChildIndex = (index * 2) + 1;
            let rightChildIndex = (index * 2) + 2;
            if (self[index] && self[leftChildIndex]) {
                if (self[index].priority > self[leftChildIndex].priority) {
                    [self[index], self[leftChildIndex]] = [self[leftChildIndex], self[index]];
                    if (index > 0) {
                        index = Math.floor(--index / 2);
                    }
                    return recurse(index);
                } else if (self[rightChildIndex]) {
                    if (self[index].priority > self[rightChildIndex].priority) {
                        [self[index], self[rightChildIndex]] = [self[rightChildIndex], self[index]];
                        if (index > 0) {
                            index = Math.floor(--index / 2);
                        }
                        return recurse(index);
                    }
                }
            }
            
            if (self.length > index) {
                return recurse(index + 1);
            }
        })(0);

    }

    add(x) {
        this.push(x);
        this.order();
    }

    remove() {
        var x = this.shift();
        this.order();
        return x;
    }
}

/* TEST CASE */
/*
var heap = new Heap(2, 6, 15, 47, 1, 3, 7);

console.log(...heap);

heap.add(10);
console.log(...heap);

heap.add(20);
console.log(...heap);

heap.add(15);
console.log(...heap);

console.log(heap.remove());
console.log(...heap);
*/

/*
var i = 1;
while (true) {
    heap.add(i++);
}

*/
