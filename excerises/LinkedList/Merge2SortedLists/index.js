/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// Solution 1
var mergeTwoLists = function (l1, l2) {
  let preHead = new ListNode();
  let cur = preHead;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      cur.next = new ListNode(l2.val);
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return preHead.next;
};
// Priritoy queue solution - // Solution 2
var mergeTwoLists = function (l1, l2) {
  let dummy = new ListNode(0);
  let temp = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      temp.next = l1;
      l1 = l1.next;
    } else {
      temp.next = l2;
      l2 = l2.next;
    }
    temp = temp.next;
  }
  if (l1 !== null) {
    temp.next = l1;
  }
  if (l2 !== null) {
    temp.next = l2;
  }
  return dummy.next;
};

// Solution 3 - recursion
mergeTwoLists = function (left, right) {
  if (!left) return right;
  if (!right) return left;
  if (left.val < right.val) {
    left.next = mergeTwoLists(left.next, right);
    return left;
  } else {
    right.next = mergeTwoLists(left, right.next);
    return right;
  }
};

/**
 * Solution 4
 */
function mergingList(first, second) {
  // if there is only one element in first
  if (first.next === null) {
    first.next = second;
  }

  let curr1 = first;
  let next1 = curr1.next;
  let curr2 = second;
  let next2 = second.next;

  while (next1 !== null && curr2 !== null) {
    // element in range
    if (curr1.data <= curr2.data && curr2.data <= next1.data) {
      // node addition
      curr1.next = curr2;
      next2 = curr2.next;
      curr2.next = next1;

      // update pointer
      curr1 = curr2;
      curr2 = next1;
    } else {
      // element not in range
      curr1 = next1;
      next1 = next1.next;
      if (next1 == null) {
        curr1.next = curr2;
        return first;
      }
    }
  }
}
function mergeTwoLists(left, right) {
  if (!left) return right;
  if (!right) return left;

  if (left.val <= right.data) {
    return mergingList(left, right);
  } else {
    return mergingList(right, left);
  }
}
