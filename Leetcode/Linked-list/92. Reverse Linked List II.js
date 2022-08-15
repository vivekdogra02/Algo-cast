/**
 * 92. Reverse Linked List II
Given the head of a singly linked list and two integers left and right 
where left <= right, reverse the nodes of the list from position left to position right,
and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]

Example 2:
Input: head = [5], left = 1, right = 1
Output: [5]

Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
 */

function reverseLinkListII(head, left, right) {
  if (head === null) return null;
  if (left === right) return head;

  let dummy = new ListNode(-1);
  let prev = dummy;
  prev.next = head;

  // loop till left
  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }

  let curr = prev.next;
  let next = curr.next;

  // loop in btw range from left to right
  for (let i = 0; i < right - left; i++) {
    curr.next = next.next;
    next.next = prev.next;
    prev.next = next;
    curr = curr.next;
  }
  return dummy.next;
}

/**
 * Solution 2
 * need to keep track of the nodes we want to point to and the start and end of our linked list.
 * the left node before reversal ends up pointing to the head of the reversed linked list.
 * the right node becomes
 *  current after it has reversed the inner linked list. this node becomes the node our end points to.
 */
var reverseBetween = function (head, left, right) {
  let current = head,
    previous = null,
    start,
    end,
    i = 0;
  while (i < left - 1) {
    previous = current;
    current = current.next;
    i++;
  }

  let j = 0;
  start = previous;
  previous = null;
  end = current;
  while (current && j < right - left + 1) {
    let next = current.next;
    current.next = previous;
    previous = current;
    current = next;
    j++;
  }

  if (start) {
    start.next = previous;
  } else {
    head = previous;
  }

  end.next = current;
  return head;
};

/**
 * Solution 3
 */
var reverseBetween = function (head, m, n) {
  const dummy = new ListNode();
  dummy.next = head;
  let prev = dummy;
  let curr = head;
  for (let i = 1; i < m; i++) {
    prev = curr;
    curr = curr.next;
  }
  const front = prev;
  const back = curr;
  for (let i = m; i <= n; i++) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }
  front.next = prev;
  back.next = curr;
  return dummy.next;
};

/**
 * Solution 4
 */

var reverseBetween = function (head, left, right) {
  let stack = [];
  let leftNode = head;
  let rightNode = head;
  let count = 1;

  while (left <= right) {
    if (count < left) {
      leftNode = leftNode.next;
      rightNode = rightNode.next;
      count++;
      continue;
    }

    if (count <= right) {
      stack.push(rightNode.val);
      rightNode = rightNode.next;
      count++;
      continue;
    }

    leftNode.val = stack.pop();
    leftNode = leftNode.next;
    left++;
  }

  return head;
};

/**
 * Solution 5
 */
var reverseBetween = function (head, left, right) {
  var dummy = new ListNode(0, head);
  var preLeft = dummy; //head might be left
  for (var i = 1; i < left; i++) {
    preLeft = preLeft.next;
  }

  //reverse
  var leftNode = preLeft.next;
  var current = preLeft.next;
  var pre = preLeft;
  for (var i = left; i <= right; i++) {
    var next = current.next;
    current.next = pre;
    pre = current;
    current = next;
  }

  //connect
  preLeft.next = pre;
  leftNode.next = current;
  return dummy.next;
};
