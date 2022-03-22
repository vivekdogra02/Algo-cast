/**
 * 144. Binary Tree Preorder Traversal
Easy
Given the root of a binary tree, return the preorder traversal of its nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [1,2,3]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Constraints:
The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 */

// Solution 1 (Iterative)

function preOrder(root) {
    if (!root) return [];
    let stack = [root];
    let result = [];
    while (stack.length) {
        let node = stack.pop();
        result.push(node);
        if (node.left) return stack.push(node.left);
        if (node.right) return stack.push(node.right);
    }
    return result;
}

// Solution (Recursive) 
// T- O(n) , S = O(n)

function preOrder(root) {
    if (!root) return [];
    let result = [];

    const preOrderRecord = (node) => {
        if (!node) return null;
        result.push(node.val);
        if (node.right) return preOrderRecord(node.right);
        if (node.left) return preOrderRecord(node.left);
    }
    preOrderRecord(root)
    return result;
}