/**
 * Given the head of a singly linked list, return the middle node of the linked list.
 *  If the number of nodes in the linked list is even,
 * there will be two middle nodes, so return the second one.
 */

// Solution 1
/**
 * Time complexity - O(n)
 * Space - O(1)
 */

function findMiddle(head) {
  if (!head) return null;
  if (head.next == null) return head;

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
