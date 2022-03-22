/**
 * 83. Remove Duplicates from Sorted List

Given the head of a sorted linked list, 
delete all duplicates such that each element appears only once. 
Return the linked list sorted as well.

Example 1:
Input: head = [1,1,2]
Output: [1,2]

Example 2:
Input: head = [1,1,2,3,3]
Output: [1,2,3]

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.

 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// Solution 1
var deleteDuplicates = function (head) {

    let dummy = new ListNode(-Infinity, head);
    dummy.next = head;
    let curr = head;
    let prev = dummy;

    while (curr) {
        if (curr.val === prev.val) {
            while (curr && curr.val === prev.val) {
                curr = curr.next;
            }
            prev.next = curr;
        } else {
            prev = curr;
            curr = curr.next;
        }
    }
    return dummy.next;
}

// Solution 2

function deleteDuplicates(head) {
    let dups = {};
    let curr = head;
    let prev;

    while (curr) {
        if (!dups[curr.val]) {
            dups[curr.val] = true;
            prev = curr;
        } else {
            prev.next = curr.next
        }
        curr = curr.next;
    }
    return head;
}

// Solution 3

var deleteDuplicates = function (head) {
    if (head == null || head.next == null) return head;
    let start = new ListNode(0, head);
    let cur = head;
    while (cur && cur.next) {
        let next = cur.next.next;
        let sec = cur.next;

        if (cur.val === sec.val) {
            cur.next = next;
        } else {
            cur = cur.next;
        }
    }

    return start.next;
};

// Solution 4

var deleteDuplicates = function (head) {
    if (head === null) return head;
    let current = head;
    let next = current.next;
    while (next !== null) {
        if (current.val == next.val) {
            current.next = next.next;
            next = current.next;
        } else {
            current = current.next;
            next = current.next;
        }

    }
    return head;
};

// Solution 5
var deleteDuplicates = function (head) {
    let node = head;
    let lastUniqueSeen = null;
    while (node) {
        if (!lastUniqueSeen || node.val !== lastUniqueSeen.val) {
            lastUniqueSeen = node;
        } else if (node.val === lastUniqueSeen.val) {
            lastUniqueSeen.next = node.next;
        }

        node = node.next;
    }

    return head;
};