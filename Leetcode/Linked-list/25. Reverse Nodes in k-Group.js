/**
 * 25. Reverse Nodes in k-Group
Hard
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. 
If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:
Input: head = [1,2,3,4,5], k = 3

Output: [3,2,1,4,5]
Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 

Follow-up: Can you solve the problem in O(1) extra memory space?
 */
/**
 * Solution 1 - using recursion
 */
var reverseKGroup = function (head, k) {
  // base case
  let prev = null;
  let count = 0;
  while (count < k && head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
    count++;
  }

  let newHead = prev;
  let tail = head;
  if (!prev) return null;
  if (!head) return prev;
  while (prev.next) {
    prev = prev.next;
    tail = tail ? tail.next : null;
  }
  prev.next = tail ? reverseKGroup(head, k) : head;
  return newHead;
};

/** Solution 2  */
var reverseKGroup = function (head, k) {
  let pointer = head;
  let count = 0;
  while (head) {
    head = head.next;
    count++;
  }
  // return if count is less than k units
  if (count < k) return pointer;

  // reverse k units
  let i = 0;
  let previous = null;
  while (i < k) {
    let temp = pointer.next;
    pointer.next = previous;
    previous = pointer;
    pointer = temp;
    i++;
  }

  // move to last reversed to continue
  let result = previous;
  while (previous.next) {
    previous = previous.next;
  }
  previous.next = reverseKGroup(pointer, k);

  return result;
};

/** ------------------------------- Other variant ------------------------------------------------------------ */
/**
 * Other variant of this question is  (Change in output)
 * Example 
 * Input: head = [1,2,3,4,5], k = 3
    Output: [3,2,1,5,4]

    T - O(N)
    S- O(N)
 */

function reverseKGroup(head, k) {
  // base
  if (head == null) return null;

  let count = 0;
  let prev = null;
  let curr = head;
  let next = null;
  // Step 1 - Reverse first k nodes
  while (curr !== null && count < k) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    count++;
  }

  // Step 2 - if next is not null (do recursion)
  if (next !== null) {
    head.next = reverseKGroup(next, k);
  }
  // Step 3 - return prev
  return prev;
}
