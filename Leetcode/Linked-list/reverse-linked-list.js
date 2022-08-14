/**
 * 206. Reverse Linked List
Given the head of a singly linked list, reverse the list, and return the reversed list.
Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
 */

function reverseLinkList(head) {
  let curr = head;
  let prev = null;
  let next;

  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// Solution 2
function reverseList(head) {
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

// Solution 3
var reverseList = function (head) {
  if (!head || !head.next) return head;
  let prev = null,
    curr = head;
  while (curr) {
    let temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }
  return prev;
};

// Solution 4
var reverseList = function (head) {
  let p1 = null;
  let p2 = head;
  while (p2 !== null) {
    let temp = p2.next; //=next node
    p2.next = p1; //change to prev node;
    p1 = p2; //move to node 1
    p2 = temp; //move to node 2
  }
  return p1;
};

// Solution 5
// Recursive Solution
var recur = function (cur, prev) {
  if (!cur) {
    return cur;
  }
  let next = cur.next;
  cur.next = prev;
  return next ? recur(next, cur) : cur;
};

var reverseList = function (head) {
  if (!head) return head;
  if (!head.next) return head;
  let result = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return result;
};

/**
 * Solutio 6
 * Recursive
 */

var recur = function (head, cur, prev) {
  // base case
  if (cur == null) {
    head = prev;
    return;
  }
  let next = cur.next;
  let result = recur(head, next, prev);
  cur.next = prev;
  return result;
};

var reverseList = function (head) {
  if (head === null || head.next === null) return head;
  let curr = head;
  let prev = null;
  let result = reverseList(head, curr, prev);
  return result;
};
