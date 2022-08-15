/**
 * Sort a linked list with 0s, 1s & 2s in ascending order
 */

/**
 * Solution 1
 *  T- O(N)
 *  S - O(1)
 */

function sortLL(head) {
  if (head === null) return null;

  let zeroCount = 0;
  let oneCount = 0;
  let twoCount = 0;

  let temp = head;

  while (temp !== null) {
    if (temp.val === 0) zeroCount++;
    else if (temp.val === 1) oneCount++;
    else if (temp.val === 2) twoCount;

    temp = temp.next;
  }

  temp = head;

  while (temp !== null) {
    if (zeroCount !== 0) {
      temp.val = 0;
      zeroCount--;
    } else if (oneCount !== 0) {
      temp.val = 1;
      oneCount--;
    } else if (twoCount !== 0) {
      temp.val = 2;
      twoCount--;
    }
    temp = temp.next;
  }

  return head;
}

/**
 * Solution 2 - Data replacement is not allowed - Can be solved through change in links or pointer
 * In this, we need to create 3 LL, zeroLL, oneLL & twoLL and update them accordingly 0s, 1s, and 2s respectively
 *      [
 *              zeroLL  ---> dummynode ---> contains all 0s
 *              oneLL   ---> dummynode ---> contains all 1s
 *              twoLL   ---> dummynode ---> contains all 2s
 *      ]
 *          ==>  Merge these list to get the sorted 0s, 1s, and 2s
 *
 *  T  -  O(N)
 *  S -  O(1)
 */

function sortLL(head) {
  let zeroHead = new ListNode(-1); // points to dummy node of 0s
  let zeroTail = zeroHead;

  let oneHead = new ListNode(-1); // points to dummy node of 1s
  let oneTail = oneHead;

  let twoHead = new ListNode(-1); // points to dummy node of 2s
  let twoTail = twoHead;

  let curr = head;
  // create separate list for 0s, 1s & 2s
  while (curr !== null) {
    // T - O(N)
    let value = curr.val;

    if (value === 0) {
      zeroTail.next = curr;
      zeroTail = curr;
    } else if (value === 1) {
      oneTail.next = curr;
      oneTail = curr;
    } else if (value === 2) {
      twoTail.next = curr;
      twoTail = curr;
    }

    curr = curr.next;
  }

  // merge all sublist
  // one edge case -- when oneLL is empty, we need to point zero from two directly

  // 1s LL is not empty
  if (oneHead.next !== null) {
    zeroTail.next = oneHead.next;
  } else {
    // 1s LL is empty
    zeroTail.next = twoHead.next;
  }
  // merge other list
  oneTail.next = twoHead.next;
  twoTail.next = null;

  // setup head

  head = oneHead.next;

  // delete not needed list
  delete zeroHead;
  delete oneHead;
  delete twoHead;
}
