


function linkedList(val) {
    this.val = val;
    this.next = null;
}


function addTwoNumber(l1, l2) {
    var carry = 0;
    var result = new LinkedList(-1)
    var resHead = result;
    while(l1 !== null  || l2 !== null) {
        var sum = carry;
        if(l1 !== null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if(l2 !== null) {
            sum += l2.val;
            l2 = l2.next;
        }

        var node = null;

        if(sum >= 10) {
            node = new LinkedList(sum-10)
            carry = 1;
        } else {
            node = new LinkedList(sum)
            carry = 0;
        }

        result.next = node;
        result = result.next;

    }

    if(carry === 1) {
        result.next = new LinkedList(1)
    }

    return resHead.next;
}