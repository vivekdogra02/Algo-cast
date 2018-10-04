
 /* 
Add Two Numbers
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
 
 */


 function ListNode(val) {
    this.val = val;
     this.next = null;
 }

 var addTwoNumbers = function(l1, l2) {
    var carry = 0;
    var result = new ListNode(-1);
    var resHead = result;
    while(l1 !== null || l2 !== null){
        var sum = carry;
        if(l1 !== null){
            sum += l1.val;
            l1 = l1.next;
        }
        if(l2 !== null){
            sum += l2.val;
            l2 = l2.next;
        }

        var node = null;
        if(sum >= 10){
            node = new ListNode(sum - 10);
            carry = 1;
        }else{
            node = new ListNode(sum);
            carry = 0;
        }
        result.next = node;
        result = result.next;
    }
    if(carry === 1){
        result.next = new ListNode(1);
    }
    return resHead.next;
};



// Java solution
public ListNode addTwoNumber(ListNode l1, ListNode l2) {
    ListNode dummyHead = new ListNode(0);
    ListNode p = l1, q = l2, curr = dummyHead;
    int carry = 0;
    while (p != null || q != null) {
        int x = (p != null) ? p.val : 0;
        int y = (q != null) ? q.val : 0;
        int sum = carry + x + y;
        carry = sum / 10;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (p != null) p = p.next;
        if (q != null) q = q.next;
    }
    if (carry > 0) {
        curr.next = new ListNode(carry);
    }
    return dummyHead.next;
}