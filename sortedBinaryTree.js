//Tree constructor
function Tree(data) {
    this.root = new this.Node(data);
    console.log("Added " + data + " as root");
}

//Node Constructor
Tree.prototype.Node = function (data, parent) {
    this.parent = parent;
    this.leftChild = null;
    this.rightChild = null;
    this.height = 0;
    this.data = data;

}

//Balance function 
/*
Tree.prototype.balance = function (parentNode) {
    var parentBalanceFactor = getBalanceFactor(parentNode);

    if (parentBalanceFactor > 1) {  //if tree is right heavy
        if (getBalanceFactor(parentNode.rightChild) < 0) {  //if tree's right subtree is left heavy
            //perform double left rotation
            parentNode.rightChild = rotateRight(parentNode.rightChild);
            reParent(parentNode.rightChild);
        }
        //perform single left rotation
        parentNode = rotateLeft(parentNode);
        reParent(parentNode);
    } else if (parentBalanceFactor < -1) {  //if tree is left heavy
        if (getBalanceFactor(parentNode.leftChild) > 0) {   //if tree's left subtree is right heavy
            //perform double right rotation
            parentNode.leftChild = rotateLeft(parentNode.leftChild);
            reParent(parentNode.leftChild);
        } 
        //perform single right rotation
        parentNode = rotateRight(parentNode);
        reParent(parentNode);
    }

    return parentNode;

    function getBalanceFactor(node) {
        var leftHeight = node.leftChild ? node.leftChild.height : -1
        var rightHeight = node.rightChild ? node.rightChild.height : -1
        return (rightHeight - leftHeight);
    }

    function rotateLeft(root) {
        var newRoot = root.rightChild;
        root.rightChild = newRoot.leftChild;
        newRoot.leftChild = root;
        return newRoot;
    }

    function rotateRight(root) {
        var newRoot = root.leftChild;
        root.leftChild = newRoot.rightChild;
        newRoot.rightChild = root;
        return newRoot;
    }

    function reParent(node) {
        //reassign parents
        if (node.rightChild) {
            node.rightChild.parent = node;
        }
        if (node.leftChild) {
            node.leftChild.parent = node;
        }
    }
    
}

*/

//Add function
Tree.prototype.add = function (data) {
    if (!this.root) {
        //If tree is empty, add as root
        this.root = new Tree.prototype.Node(data);
    } else {
        //search for a good available node to add to
        var _root = this.root;
        (function recurse(currentNode) {
            if (data < currentNode.data) {
                if (currentNode.leftChild) {
                    recurse(currentNode.leftChild);
                } else {
                    //parentWithEmptySpot = currentNode;
                    currentNode.leftChild = new Tree.prototype.Node(data, currentNode);
                    console.log("Added " + data + " as left child  of " + currentNode.data);
                }
            } else if (data > currentNode.data) {
                if (currentNode.rightChild) {
                    recurse(currentNode.rightChild);
                } else {
                    //parentWithEmptySpot = currentNode;
                    currentNode.rightChild = new Tree.prototype.Node(data, currentNode);
                    console.log("Added " + data + " as right child  of " + currentNode.data);

                }
            } else if (data == currentNode.data) {
                //If node has the same value don't add it
                console.log("Value already in tree");
                return;
            }
            
            //get height and balance factor
            var leftHeight = currentNode.leftChild ? currentNode.leftChild.height : -1;
            var rightHeight = currentNode.rightChild ? currentNode.rightChild.height : -1;
            currentNode.height = Math.max(leftHeight, rightHeight) + 1;
            var balanceFactor = rightHeight - leftHeight;
            

            if (balanceFactor > 1 || balanceFactor < -1) {
                
                var balancedNode;
                var grandParent = currentNode.parent;

                balancedNode = balance(currentNode);
                balancedNode.parent = grandParent;

                if (grandParent !== undefined) {
                    if (grandParent.data > balancedNode.data) {
                        grandParent.leftChild = balancedNode;
                    } else {
                        grandParent.rightChild = balancedNode;
                    }
                } else {
                    _root = balancedNode;
                }
                
                //recalculate height
                (function recurse(currentNode) {
                    if (currentNode.leftChild) {
                        recurse(currentNode.leftChild);
                    }
                    if (currentNode.rightChild) {
                        recurse(currentNode.rightChild);
                    }

                    var leftHeight = currentNode.leftChild ? currentNode.leftChild.height : -1;
                    var rightHeight = currentNode.rightChild ? currentNode.rightChild.height : -1;
                    currentNode.height = Math.max(leftHeight, rightHeight) + 1;

                })(balancedNode);
            }


        })(this.root);

        this.root = _root;
    }

    function balance(parentNode) {
        var parentBalanceFactor = getBalanceFactor(parentNode);

        if (parentBalanceFactor > 1) {  //if tree is right heavy
            if (getBalanceFactor(parentNode.rightChild) < 0) {  //if tree's right subtree is left heavy
                //perform double left rotation
                parentNode.rightChild = rotateRight(parentNode.rightChild);
                reParent(parentNode.rightChild);
            }
            //perform single left rotation
            parentNode = rotateLeft(parentNode);
            reParent(parentNode);
        } else if (parentBalanceFactor < -1) {  //if tree is left heavy
            if (getBalanceFactor(parentNode.leftChild) > 0) {   //if tree's left subtree is right heavy
                //perform double right rotation
                parentNode.leftChild = rotateLeft(parentNode.leftChild);
                reParent(parentNode.leftChild);
            }
            //perform single right rotation
            parentNode = rotateRight(parentNode);
            reParent(parentNode);
        }

        return parentNode;

        function getBalanceFactor(node) {
            var leftHeight = node.leftChild ? node.leftChild.height : -1
            var rightHeight = node.rightChild ? node.rightChild.height : -1
            return (rightHeight - leftHeight);
        }

        function rotateLeft(root) {
            var newRoot = root.rightChild;
            root.rightChild = newRoot.leftChild;
            newRoot.leftChild = root;
            return newRoot;
        }

        function rotateRight(root) {
            var newRoot = root.leftChild;
            root.leftChild = newRoot.rightChild;
            newRoot.rightChild = root;
            return newRoot;
        }

        function reParent(node) {
            //reassign parents
            if (node.rightChild) {
                node.rightChild.parent = node;
            }
            if (node.leftChild) {
                node.leftChild.parent = node;
            }
        }
    }
}
/*
//Remove function
Tree.prototype.remove = function (data) {
    var currentNode;
    var parent;
    if (!this.root) {
        console.log("Tree is empty");
    } else if (data == this.root.data) {
        //If the deleted node is root
        console.log(data + " found, deleting...");
        currentNode = this.root;
        //If root has child on the left make that one take its place
        if (currentNode.leftChild) {
            this.root = currentNode.leftChild;
            console.log("Moved " + currentNode.leftChild.data + " as root of tree");
            this.root.parent = null;

            if (currentNode.rightChild) {
                //append the right side if there is one
                parent = Tree.prototype.searchEmptySpotFor(currentNode.rightChild, currentNode.leftChild);
                if (currentNode.rightChild < parent.leftChild) {
                    parent.leftChild = currentNode.rightChild;
                    parent.leftChild.parent = parent;
                    console.log("Moved " + currentNode.rightChild.data + " as left child  of " + parent.data);
                } else {
                    parent.rightChild = currentNode.rightChild;
                    parent.rightChild.parent = parent;
                    console.log("Moved " + currentNode.rightChild.data + " as right child  of " + parent.data);
                }

            }
        } else if (currentNode.rightChild) {
            this.root = currentNode.rightChild;
            this.root.parent = null;
            console.log("Moved " + currentNode.rightChild.data + " as root");
        } else {
            this.root = null;
            console.log("Tree is Empty");
        }
    } else {
        //Deleted node is not the root
        currentNode = this.search(data);
        if (currentNode) {
            console.log(data + " found, deleting...");
            if (currentNode.data < currentNode.parent.data) {
                //current is left child
                if (currentNode.leftChild) {

                    currentNode.parent.leftChild = currentNode.leftChild;
                    currentNode.parent.leftChild.parent = currentNode.parent;
                    console.log("Moved " + currentNode.leftChild.data + " as left child  of " + currentNode.parent.data);

                    if (currentNode.rightChild) {
                        //append the right side if there is one
                        parent = Tree.prototype.searchEmptySpotFor(currentNode.rightChild, currentNode.leftChild);
                        if (currentNode.rightChild < parent.leftChild) {
                            parent.leftChild = currentNode.rightChild;
                            parent.leftChild.parent = parent;
                            console.log("Moved " + currentNode.rightChild.data + " as left child  of " + parent.data);
                        } else {
                            parent.rightChild = currentNode.rightChild;
                            parent.rightChild.parent = parent;
                            console.log("Moved " + currentNode.rightChild.data + " as right child  of " + parent.data);
                        }
                    }
                } else if (currentNode.rightChild) {
                    currentNode.parent.leftChild = currentNode.rightChild;
                    currentNode.parent.leftChild.parent = currentNode.parent;
                    onsole.log("Moved " + currentNode.rightChild.data + " as left child  of " + currentNode.parent.data);
                } else {
                    currentNode.parent.leftChild = null;
                }
            } else {
                //current is right child
                if (currentNode.leftChild) {

                    currentNode.parent.rightChild = currentNode.leftChild;
                    currentNode.parent.rightChild.parent = currentNode.parent;
                    console.log("Moved " + currentNode.leftChild.data + " as right child  of " + currentNode.parent.data);
                    //append the right side if there is one

                    if (currentNode.rightChild) {
                        //append the right side if there is one
                        parent = Tree.prototype.searchEmptySpotFor(currentNode.rightChild, currentNode.leftChild);
                        if (currentNode.rightChild < parent.leftChild) {
                            parent.leftChild = currentNode.rightChild;
                            parent.leftChild.parent = parent;
                            console.log("Moved " + currentNode.rightChild.data + " as left child  of " + parent.data);
                        } else {
                            parent.rightChild = currentNode.rightChild;
                            parent.rightChild.parent = parent;
                            console.log("Moved " + currentNode.rightChild.data + " as right child  of " + parent.data);
                        }

                    }

                } else if (currentNode.rightChild) {
                    currentNode.parent.rightChild = currentNode.rightChild;
                    currentNode.parent.rightChild.parent = currentNode.parent;
                    console.log("Moved " + currentNode.rightChild.data + " as right child  of " + currentNode.parent.data);
                } else {
                    currentNode.parent.rightChild = null;
                }

            }
        }
    }
};
*/

//Traverse All function
Tree.prototype.traverse = function (callback) {
    (function recurse(currentNode) {
        if (currentNode.leftChild) {
            recurse(currentNode.leftChild);
        }
        if (currentNode.rightChild) {
            recurse(currentNode.rightChild);
        }      

        callback(currentNode);

    })(this.root);

};

//Search function
Tree.prototype.search = function (data) {
    var founded = null;
    (function recurse(currentNode) {
        if (data < currentNode.data) {
            if (currentNode.leftChild) {
                recurse(currentNode.leftChild);
            } else {
                console.log("Not found");
            }
        } else if (data > currentNode.data) {
            if (currentNode.rightChild) {
                recurse(currentNode.rightChild);
            } else {
                console.log("Not found");
            }
        } else if (data == currentNode.data) {
            founded = currentNode;
        }
    })(this.root);

    return founded;
};

/*
//Utility function - looks for a correct node with an available child
Tree.prototype.searchEmptySpotFor = function (forNode, fromNode, changeHeight) {
    var parentWithEmptySpot = null;
    var data;
    if (forNode instanceof Tree.prototype.Node) {
        data = forNode.data;
    } else {
        data = forNode;
    }

    (function recurse(currentNode) {
        if (data < currentNode.data) {
            if (currentNode.leftChild) {
                recurse(currentNode.leftChild);
            } else {   
                parentWithEmptySpot = currentNode;
            }
        } else if (data > currentNode.data) {
            if (currentNode.rightChild) {
                recurse(currentNode.rightChild);
            } else {
                parentWithEmptySpot = currentNode;
            }
        } else if (data == currentNode.data) {
            parentWithEmptySpot = currentNode;
            changeHeight = false;
        }

        if (changeHeight) {
            var leftHeight = currentNode.leftChild ? currentNode.leftChild.height : -1
            var rightHeight = currentNode.rightChild ? currentNode.rightChild.height : -1
            currentNode.height = Math.max(leftHeight, rightHeight) + 1;
            if (parentWithEmptySpot == currentNode) {
                if (currentNode.height === 0) {
                    currentNode.height++;
                }
            }
        }


    })(fromNode);
    
    return parentWithEmptySpot;
}
*/

//TEST CASE
tree = new Tree(10);
tree.add(5);
tree.add(7);

tree.add(20);
tree.add(11);
tree.add(6);
tree.add(2);
tree.add(4);
tree.add(3);
tree.add(31);
tree.add(19);
/*
tree.remove(10);
tree.remove(5);
tree.remove(20);
tree.remove(2);
tree.remove(11);
*/

tree.traverse(function (node) {
    console.log(node.data, node.height);
});