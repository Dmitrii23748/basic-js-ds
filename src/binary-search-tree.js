const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.startNode = null;
  }

  root() {
    return this.startNode;
  }

  add( data, startNode = this.startNode) {
    if (startNode == null) {
      this.startNode = new Node(data);
      return;
    }
    
    if (data < startNode.data) {
      if (startNode.left == null) {
        startNode.left = new Node(data);
      } else {
        this.add(data, startNode.left);
      }
    }
    if (data > startNode.data) {
      if (startNode.right == null) {
        startNode.right = new Node(data);
      } else {
        this.add(data, startNode.right);
      }
    }
    
  }

  has(data) {
    if (this.find(data, this.startNode)) {
      return true;
    }
    return false;
  }


  find(data, startNode = this.startNode) {
    if (startNode.data == data) {
      return startNode;
    }
    if (data < startNode.data) {
      if (startNode.left == null) {
        return null;
      } else {
        return this.find(data, startNode.left);
      }
    } else if (data > startNode.data) {
      if (startNode.right == null) {
        return null;
      } else {
        return this.find(data, startNode.right);
      }
    }
  }

  remove(data) {
    if (this.has(data)) {
      this.startNode = removeWithin(this.startNode, data);

      function removeWithin(node, data) {
        if (node.data == data) {
          if (node.left == null && node.right == null) {
            return null;
          } else if (node.left == null) {
            node = node.right;
            return node;
          } else if (node.right == null) {
            node = node.left;
            return node;
          } else {
            if (node.right.left == null) {
              node.data = node.right.data;
              node.right = node.right.right;
              return node;
            }
            let rem = minLeft(node.right);
            node = removeWithin(node, rem.data);
            node.data = rem.data;

            function minLeft(node) {
              while (node.left) {
                node = node.left;
              }
              return node;
            }
            return node;
          }
        }
        if (node.data < data) {
          node.right = removeWithin(node.right, data);
          return node;
        } else {
          node.left = removeWithin(node.left, data);
          return node;
        }
      }
    }
  }

  min() {
    let factValue = this.startNode;
    while (factValue.left) {
      factValue = factValue.left;
    }
    return factValue.data;
  }
  max() {
    let factValue = this.startNode;
    while (factValue.right) {
      factValue = factValue.right;
    }
    return factValue.data;
  }
}

module.exports = {
  BinarySearchTree
};