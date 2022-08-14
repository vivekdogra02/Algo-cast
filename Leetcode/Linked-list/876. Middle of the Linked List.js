/**
 * 876. Middle of the Linked List
 * Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node.
Example 1:


Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.

Example 2:
Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

Constraints:

The number of nodes in the list is in the range [1, 100].
1 <= Node.val <= 100
 * 
 */
/**
 * Solution -1 (With len)
 *  T - O(n) + O(n/2)  = > O(N)
 *  S - O(N)
 */

function getLength(head) {
  let len = 0;

  while (head !== null) {
    len++;
    head = head.next;
  }

  return len;
}

function getMiddle(head) {
  const len = getLength(head);
  const ans = parseInt(len / 2);
  let temp = head;
  let cnt = 0;
  while (cnt < ans) {
    cnt++;
    temp = temp.next;
  }
  return temp;
}

/**
 * Solution 2  - optimized solution
 * one person cover n meter (Traverse 2 nodes at a time)
 * other person cover n/2 meter (traverse 1 node at a time)
 *
 * T - O(N)
 * S- O(1)
 */

function getMiddle(head) {
  // base case
  if (head === null || head.next === null) {
    return head;
  }

  // 2 nodes are present
  if (head.next.next == null) return head.next;

  let fast = head.next;
  let slow = head;

  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
    if (fast.next !== null) {
      fast = fast.next;
    }
  }
  return slow;
}
