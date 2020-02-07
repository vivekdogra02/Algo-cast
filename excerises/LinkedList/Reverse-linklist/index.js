/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
   let prev=null
   let cur=head
   while(cur){
       let holder=cur.next
       cur.next=prev
       prev=cur
       cur=holder
   }
   return prev
};
// --------------------------------------------------------------------------------------------------------------------//

// Solution 2
var reverseList = function(head) {
   let prev = null;
  while(head) {
       let next = head.next;
       head.next = prev;
      prev = head;
      head = next;
   }
   return prev;
};
// --------------------------------------------------------------------------------------------------------------------//

// Solution 3

var reverseList = function(head){
  
   var tmp = null;
   var newHead = null;
   while(head !== null){
     tmp = head;
     head = head.next;
     tmp.next = newHead;
     newHead = tmp;
   }
   
   return newHead;
 }
// --------------------------------------------------------------------------------------------------------------------//

 // Solution 4

 function reverseList(head) {
   if (!head || !head.next) {
       return head;
   }
   var newHead = reverseList(head.next);
   head.next.next = head;
   head.next = null;
   return newHead;
}
