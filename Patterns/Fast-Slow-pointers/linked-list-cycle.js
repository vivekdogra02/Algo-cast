/**
 * 
 * 141. Linked List Cycle
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.
 */

// Solution 1
// Time complexity = O(N)
// Space - O(1)
function hasCycle(head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) return true;
  }
  return false;
}

// Solution 2
var hasCycle = function (head) {
  if (head == null || head.next == null) {
    return false;
  }
  let walker = head;
  let runner = head;

  while (runner != null && runner.next != null) {
    walker = walker.next;
    runner = runner.next.next;
    if (walker == runner) {
      return true;
    }
  }
  return false;
};

// Solution 3
var hasCycle = function (head) {
  if (head === null) return false;
  let slow = head,
    fast = head.next;
  while (slow !== fast) {
    if (fast === null || fast.next === null) return false;
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
}; //

// Solution 4

var hasCycle = function (head) {
  if (head === null) {
    return false;
  }
  let slow = head;
  let fast = head;
  while (fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};
