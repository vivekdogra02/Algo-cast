/**
 * Given a singly linked list, remove the nth node from the end of the list and return its head.
 */

/**
 * Optimized approach using two pointers#
 *
 * Steps
 * Two pointers, left and right, are set at the head node.
 * Move the right pointer n steps forward. After doing that,
 * both pointers are exactly separated by n nodes apart.
 * Start moving both pointers forward until the right pointer reaches the last node.
 * At this point, the left pointer will be pointing to the node before the target node, i.e nth nod
 *  We relink the left node to the node next to left pointer’s next node.
 *
 * If the right pointer reaches NULL while moving it n steps forward,
 * it means that the head node should be removed. We return the head's next node.
 */

/**
 *
 * Time complexity  - O(N), where n is the number of nodes in the linked list
 * Space complexity = O(1), as we using constant space to store two pointers.
 */

function removeNthLastNode(head, n) {
  let left = head;
  let right = head;

  for (let i = 0; i < n; i++) {
    right = right.next;
  }

  if (!right) {
    return head.next;
  }

  while (right.next !== null) {
    right = right.next;
    left = left.next;
  }

  left.next = left.next.next;

  return head;
}
