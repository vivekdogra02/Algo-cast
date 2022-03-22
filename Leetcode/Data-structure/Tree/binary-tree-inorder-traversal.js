/**
 * 94. Binary Tree Inorder Traversal
Given the root of a binary tree, return the inorder traversal of its nodes' values.
Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]

Example 2:
Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

Follow up: Recursive solution is trivial, could you do it iteratively?
 */

// Recursive solution
// Solution 1
var inorderTraversal = function (root) {
    if (root === null) {
        return [];
    } else {
        var result = [];
        function traverseInOrder(node) {
            node.left && traverseInOrder(node.left);
            result.push(node.val)
            node.right && traverseInOrder(node.right);
        }
        traverseInOrder(root)
        return result;
    }
};

// Solution 2
var inorderTraversal = function (root) {
    let array = [];

    if (root !== null) {
        array = array.concat(inorderTraversal(root.left));
        array.push(root.val);
        array = array.concat(inorderTraversal(root.right));
    }

    return array;

};


// Iterative Solution
// solution 1
var inorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let current = root;

    while (current != null || stack.length) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    return result;
};

// Solution 2
var inorderTraversal = function (root) {
    if (!root)
        return [];
    let res = [];
    let stack = [];
    let node = root;

    while (node || stack.length) {
        if (node) {
            stack.push(node);
            node = node.left;
        }
        else {
            node = stack.pop();
            res.push(node.val);
            node = node.right;
        }
    }
    return res;
};