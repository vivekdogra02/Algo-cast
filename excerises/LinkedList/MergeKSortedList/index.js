/*
Merge k Sorted Lists
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:

Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
*/

function ListNode(val) {
        this.val = val;
        this.next = null;
}
 // 1.  Priority Queue solution -- Start
 function merge(a,b) {
    let dummy = new ListNode(0);
    let temp = dummy;

    while(a !== null && b !== null) {
       if(a.val < b.val) {
          temp.next = a;
          a = a.next;
       } else {
          temp.next = b;
          b = b.next;
       }
       temp = temp.next;
    }
    if(a !== null) {
       temp.next = a;
    }
    if(b !== null) {
       temp.next = b;
    }
    return dummy.next;
 }

 function mergeKlist(lists) {
    if(lists.length === 0) {
       return null;
    }
   // priority queue
    while(lists.length > 1) {
       let a = lists.shift(); // The head will contains the "less" length list
       let b = lists.shift(); // Actually, we can use the linkedlist to replace it, the while loop will be the while( list.header.next !== null || lists.length > 0)
       const h = merge(a,b);
       lists.push(h);
    }
    return lists[0];
 }
 // Priority Queue solution -- End

// --------------------------------------------------------------------------------------------------------------------//

// 2. Divide and conquersolution -- Start
function merge(left, right) {
   if(!left) return right;
   if(!right) return left;
   if(left.val < right.val) {
      left.next = merge(left.next, right);
      return left;
   } else {
      right.next = merge(left, right.next);
      return right;
   }
}
function helper(lists, start, end) {
   if(start  === end) {
      return lists[start];
   } else if(start < end) {
      const mid = parseInt((start + end) / 2);
      const left = helper(lists, start, mid);
      const right = helper(lists, mid + 1, end);
      return merge(left, right);
   } else {
      return null;
   }
}

function mergeKLists(lists) {
   return helper(lists, 0, lists.length - 1);
}; 
// Divide and conquersolution -- End

// --------------------------------------------------------------------------------------------------------------------//

// 3. Solution

var mergeKLists = function(lists) {
    
   var tempArry = [], listsLength;
   
   //Delete all empty entries.
   for (var i = 0; i < lists.length; ) {
       if (lists[i]) {
           i++;
       } else {
           lists.splice(i, 1);
       }
   }
   if (lists.length === 0) return [];
   
   while (lists.length > 1) {
       listsLength = lists.length;
       if (listsLength % 2 !== 0) {
           lists.push(null);
           listsLength++;
       }
       for (var i = 0; i < listsLength; i += 2) {
           tempArry.push(merge2Lists(lists[i], lists[i + 1]));
       }
       lists = tempArry;
       tempArry = [];
   }
   return lists[0];
   
   function merge2Lists(list1, list2) {
       var head = new ListNode(0), temp = head;
       while (list1 && list2) {
           if (list1.val < list2.val) {
               temp.next = new ListNode(list1.val);
               list1 = list1.next;
           } else {
               temp.next = new ListNode(list2.val);
               list2 = list2.next;
           }
           temp = temp.next;
       }
       temp.next = list1 ? list1 : list2;
       return head.next;
   }
};

// --------------------------------------------------------------------------------------------------------------------//

// Solution 4
var mergeKLists = function(lists) {
   const mapValues = new Map();
   const listsLength = lists.length
   for (let i = 0; i < listsLength; i++) {
       let list = lists[i];
       while (list !== null) {
           if (mapValues.has(list.val)) {
               let val = mapValues.get(list.val) + 1;
               mapValues.set(list.val, val)
           } else {
               mapValues.set(list.val, 1)
           }
           list = list.next;
       } 
   }
   let res = null;// = new ListNode(null);
   let node = null;
   [...mapValues.keys()].sort((a, b) => +a > +b ? -1 : 1).forEach(key => {
       for (let i = 0; i < mapValues.get(key); i++) {
           if (res) {
               node = res;                
           }
           res = new ListNode(key);
           res.next = node
       }
   });
   return res;
};

// --------------------------------------------------------------------------------------------------------------------//

// Solution 5 using min heap

class Heap {
   constructor(comparator) {
       this.data = [];
       this.comparator = comparator || ((parent, child) => parent - child);
   }

   get size() {
       return this.data.length;
   }

   bubbleUp(c) {
       if (c === 0) return;
       const p = Math.floor((c + 1) / 2) - 1;
       if (this.comparator(this.data[p], this.data[c]) > 0) {
           [this.data[p], this.data[c]] = [this.data[c], this.data[p]];
       }
       this.bubbleUp(p);
   }

   bubbleDown(p) {
       const c = 2 * (p + 1) - 1;
       if (c >= this.data.length) return;

       const leftDelta = this.comparator(this.data[p], this.data[c]);
       const rightDelta = c + 1 >= this.data.length ? 0 : this.comparator(this.data[p], this.data[c + 1]);
       if (leftDelta <= 0 && rightDelta <= 0) return;

       const swapChildIndex = c + (leftDelta <= rightDelta);
       [this.data[p], this.data[swapChildIndex]] = [this.data[swapChildIndex], this.data[p]];
       this.bubbleDown(swapChildIndex);
   }

   add(val) {
       this.data.push(val);
       this.bubbleUp(this.data.length - 1);
   }

   poll() {
       if (this.size < 2) return this.data.pop();
       [this.data[0], this.data[this.size - 1]] = [this.data[this.size - 1], this.data[0]];
       const val = this.data.pop();
       this.bubbleDown(0);
       return val;
   }
}

var mergeKLists = function(lists) {
   if (!lists.length) return null;
   
   const minHeap = new Heap((parent, child) => parent.val - child.val);
   for (let node of lists) {
       if (node) minHeap.add(node);
   }
   
   const dummy = new ListNode();
   let tail = dummy;
   while (minHeap.size) {
       tail.next = minHeap.poll();
       tail = tail.next;
       if (tail.next) minHeap.add(tail.next);
   }
   
   return dummy.next;
};

// --------------------------------------------------------------------------------------------------------------------//
// Solution 6  using priority queue
var mergeKLists_priority_queue = function(lists) {
   let queue = new PriorityQueue();
   lists.forEach(list => {
       if(list) queue.enqueue(list, list.val)
   });

   let res = new ListNode(-1);
   let cur = res;
   while(!queue.isEmpty()) {
       cur.next = queue.dequeue();
       cur = cur.next;
       if(cur.next) queue.enqueue(cur.next, cur.next.val);
   }
   return res.next;
}

class Node {
  constructor(val, priority) {
     this.val = val;
     this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
     this.values = [];
  }

  enqueue(val, priority) {
     let node = new Node(val, priority);
     this.values.push(node);
     this.bubbleUp();
  }

  dequeue() {
     let max = this.values[0];
     let end = this.values.pop();
     if(this.values.length) {
        this.values[0] = end;
        this.bubbleDown();
     }
     return max.val;
  }
   
   isEmpty() {
       return !this.values.length;
   }
   
   bubbleUp(index = this.values.length - 1) {
     if(index <= 0) return;
     let parentIndex = Math.floor((index - 1) / 2);
     if(this.values[index].priority <= this.values[parentIndex].priority) {
        [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]];
        this.bubbleUp(parentIndex);
     }
  }
  
  bubbleDown(index = 0, swapIndex = null) {
     let leftIndex = index * 2 + 1,
        rightIndex = index * 2 + 2,
        length = this.values.length;

     if(leftIndex < length) {
        if(this.values[leftIndex].priority <= this.values[index].priority) {
           swapIndex = leftIndex;
        }
     }

     if(rightIndex < length) {
        if((swapIndex === null && this.values[rightIndex].priority <= this.values[index].priority) || (swapIndex !== null && this.values[rightIndex].priority <= this.values[leftIndex].priority)) {
           swapIndex = rightIndex;
        }
     }

     if(swapIndex !== null) {
        [this.values[index], this.values[swapIndex]] = [this.values[swapIndex], this.values[index]];
        this.bubbleDown(swapIndex, null);
     }
  }
}