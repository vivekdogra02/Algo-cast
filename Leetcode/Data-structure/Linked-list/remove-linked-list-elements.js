/**
 * 203. Remove Linked List Elements
Easy
Given the head of a linked list and an integer val,
 remove all the nodes of the linked list that has Node.val == val, and return the new head.
Example 1:
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Example 2:
Input: head = [], val = 1
Output: []

Example 3:
Input: head = [7,7,7,7], val = 7
Output: []

Constraints:
The number of nodes in the list is in the range [0, 104].
1 <= Node.val <= 50
0 <= val <= 50
 */

function removeElements(head, val) {
    let dummy = new ListNode(-1);
    dummy.next = head;

    let curr = head;
    let prev = dummy;

    while (curr) {
        if (curr.val === val) {
            prev.next = curr.next;
            curr = curr.next;
        } else {
            prev = curr;
            curr = curr.next;
        }
    }
    return dummy.next;
}

// Solution 2
const removeElements = (head, val) => {
    if (!head) return head;

    let x = head;
    while (x) {
        while (x.next && x.next.val === val) x.next = x.next.next;
        x = x.next;
    }

    if (head.val === val) {
        head = head.next;
    }

    return head;
};

// Solution 3
var removeElements = function (head, val) {
    let dummy = new ListNode();
    let cur = dummy;

    while (head !== null) {
        if (head.val !== val) {
            cur.next = head;
            cur = cur.next;
        }
        head = head.next;
    }
    cur.next = null;
    return dummy.next;
    // Time Complexity: O(n)
    // Space Complexity: O(1)
};

// Solution 4
var removeElements = function (head, val) {
    if (!head) return null;
    if (head.val === val) return removeElements(head.next, val);

    let temp = head;
    let prev = null;
    while (temp !== null) {
        if (temp.val === val) {
            prev.next = temp.next;
        } else prev = temp;
        temp = temp.next;
    }

    return head;
};