/**
 * 82. Remove Duplicates from Sorted List II
 * Medium
Given the head of a sorted linked list, delete all nodes that have duplicate numbers, 
leaving only distinct numbers from the original list. Return the linked list sorted as well.

Example 1:
Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]

Example 2:
Input: head = [1,1,1,2,3]
Output: [2,3]

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.
 */

/**
 * Solution 1
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
function removeDuplicatesLL(head) {
  if (head === null) return null;
  let dummy = new ListNode(-1, head);
  let prev = dummy;
  let curr = head;

  while (curr !== null) {
    while (curr.next !== null && curr.val === curr.next.val) {
      curr = curr.next;
    }
    // duplicates found with prev and curr
    if (prev.next === curr) {
      prev = curr;
      curr = curr.next;
    } else {
      // jump to curr and update prev.next and update curr
      prev.next = curr.next;
      curr = curr.next;
    }
  }
  return dummy.next;
}

// Solution 2

function removeDuplicatesLL(head) {
  let dummy = new ListNode(-1, head);
  let prev = dummy;
  let curr = head;
  while (curr !== null) {
    if (curr.next !== null && curr.val === curr.next.val) {
      while (curr.next !== null && curr.val === curr.next.val) {
        curr = curr.next;
      }
      prev.next = curr.next;
    } else {
      prev = prev.next;
    }

    curr = curr.next;
  }

  return dummy.next;
}
