/**
 * 145. Binary Tree Postorder Traversal
Given the root of a binary tree, return the postorder traversal of its nodes' values.
Example 1:
Input: root = [1,null,2,3]
Output: [3,2,1]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Constraints:

The number of the nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 */

// Recursive solution
// Solution 1
var postorderTraversal = function (root) {
    if (root === null) {
        return null;
    } else {
        var result = [];
        function traversePostOrder(node) {
            node.left && traversePostOrder(node.left);
            node.right && traversePostOrder(node.right);
            result.push(node.val);
        }
        traversePostOrder(root);
        return result;
    }
};

// Solution 2
var postorderTraversal = function (root) {
    let output = []
    if (root === null) return [];
    output = output.concat(postorderTraversal(root.left))
    output = output.concat(postorderTraversal(root.right))

    output.push(root.val)
    return output;
};

// Iterative Solution
// solution 1
var postorderTraversal = function (root) {
    if (root === null) return [];
    const answer = [];
    const stack = [root];

    while (stack.length > 0) {
        const current = stack.pop();
        answer.unshift(current.val);

        if (current.left) stack.push(current.left);
        if (current.right) stack.push(current.right);
    }
    return answer;
};

// Solution 2
var postorderTraversal = (root) =>{
    let stack = [root],
    answer = []
  while (stack.length) {
    let node = stack.pop()
    if (node) {
      answer.unshift(node.val)
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
    }
  }
  return answer
}