//function to find a pair of numbers that are on the same level within a tree
// I implemented it in the tree.js file. Here is a copy as a comment.

var tree = new Tree(1);
 
tree._root.children.push(new Node(2));
tree._root.children[0].parent = tree;
 
tree._root.children.push(new Node(3));
tree._root.children[1].parent = tree;
 
tree._root.children.push(new Node(4));
tree._root.children[2].parent = tree;
 
tree._root.children[0].children.push(new Node(5));
tree._root.children[0].children[0].parent = tree._root.children[0];
 
tree._root.children[0].children.push(new Node(6));
tree._root.children[0].children[1].parent = tree._root.children[0];
 
tree._root.children[2].children.push(new Node(7));
tree._root.children[2].children[0].parent = tree._root.children[2];
 


/*Tree.prototype.findSameLevel = function(n1, n2) {
    var currentQueue = [];
    var foundN1;
    var foundN2;
    
    currentQueue.push(this._root);

    while(currentQueue.length != 0) {
        var childrenQueue = [];
        foundN1 = false;
        foundN2 = false;

        currentTree = currentQueue.shift();

        while(currentTree){
            for (var i = 0, length = currentTree.children.length; i < length; i++) {
                if (currentTree.children[i].data == n1){
                    foundN1 = true;
                    console.log("found n1");
                }

                if (currentTree.children[i].data == n2){
                    foundN2 = true;
                    console.log("found n2");
                }
                console.log(currentTree.children[i]);
                childrenQueue.push(currentTree.children[i]);
            }
            currentTree = currentQueue.shift();
        }
        if (foundN1 && foundN2) {
            console.log("found");
            return;
        }
        
        currentQueue = childrenQueue;
        
        console.log("check next level");
        
    }
    console.log("not found"); 
};*/

tree.findSameLevel(3,2);
 