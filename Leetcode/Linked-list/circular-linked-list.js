/**
 * Circular LL
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
  this.tail = null;
  var Node = function (element) {
    this.element = element;
    this.next = null;
  };
  this.insertNode = (element, data) => {
    // empty list
    if (this.tail == null) {
      let newNode = new Node(data);
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      // non empty list
      let curr = new Node(0);
      curr = this.tail;

      while (curr.element !== element) {
        curr = curr.next;
      }
      // elem found == curr is representing elem
      let temp = new Node(data);
      temp.next = curr.next;
      curr.next = temp;
    }
  };

  this.deleteNode = (val) => {
    // empty list
    if (this.tail === null) {
      console.log("List is empty please check again");
      return;
    } else {
      // non - empty
      // assuming that val is present in the list
      let prev = this.tail;
      let curr = prev.next;

      while (curr.element !== val) {
        prev = curr;
        curr = curr.next;
      }
      // elemt found
      prev.next = curr.next;

      // If single node present
      if (curr == prev) {
        this.tail = null;
      }
      // if more than 1 node present
      if (this.tail === curr) {
        this.tail = prev;
      }
      curr.next = null;
      delete curr;
    }
  };

  this.print = () => {
    let temp = this.tail;
    if (this.tail == null) {
      console.log("List is empty");
      return;
    }
    console.log(temp);

    do {
      console.log(this.tail.element);
      this.tail = this.tail.next;
    } while (this.tail !== temp);
  };
}
let tail = null;
var circular = new ListNode();
console.log("---------------------- Insertion begins--------------------");
circular.insertNode(5, 3);
circular.print();
circular.insertNode(3, 5);
circular.print();
circular.insertNode(5, 7);
circular.print();
circular.insertNode(7, 9);
circular.print();
circular.insertNode(5, 6);
circular.print();

circular.insertNode(9, 10);
circular.print();

circular.insertNode(3, 4);
console.log("---------------------- Before deletion --------------------");
circular.print();

// deleting a nod
circular.deleteNode(6);
console.log("---------------------- After deletion --------------------");
circular.print();
