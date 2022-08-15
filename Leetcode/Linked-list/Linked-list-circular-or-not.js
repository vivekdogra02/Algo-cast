/**
 * Check whether the linked list is circular or not
 * (if you reach to head again , then it is circular)
 * T - O(N) - traverse through n nodes
 * S - O(1)
 */

function isCircularLL(head) {
  if (head === null) return null;

  let temp = head.next;
  while (temp !== null && temp !== head) {
    temp = temp.next;
  }

  // if head found again return true(It is circular) else false
  if (temp === head) return true;
  else return false;
}

// floyd cycle detection algo

function floydDetectCycle(head) {
  if (head === null) return null;

  let slow = head;
  let fast = head;

  while (slow !== null && fast !== null) {
    fast = fast.next;
    if (fast !== null) {
      fast = fast.next;
    }
    slow = slow.next;

    // has cycle
    if (slow === fast) {
      // return slow (intersection point)
      return true;
    }
  }
  return false;
}

/**------------------------- Find the starting point of the Cycle with FDC Algo---------------------------------*/

function getStartingPoint(head) {
  if (head === null) return null;
  // step 1 - find  the intersection point of the cycle
  let intersection = floydDetectCycle(head);

  // step 2 -- set slow to head again and run both intersection point and slow by 1 step now
  let slow = head;
  while (slow !== intersection) {
    slow = slow.next;
    intersection = intersection.next;
  }
  // step 3 - this will give us the intersection point where the cycle starts(Starting point of the cycle)
  return slow;
}

/** ------------------------- Remove loop for the cycle ---------------------------- */

function removeLoop(head) {
  if (head == null) return null;

  let startPoint = getStartingPoint(head);
  let temp = startPoint;

  while (temp.next !== startPoint) {
    temp = temp.next;
  }

  temp.next = null;
  return head;
}
