/**
 * 232. Implement Queue using Stacks
Easy

Implement a first in first out (FIFO) queue using only two stacks. 
The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.
Notes:

You must use only standard operations of a stack, which means only push to top, peek/pop from top, size,
and is empty operations are valid.
Depending on your language, the stack may not be supported natively.
You may simulate a stack using a list or deque (double-ended queue) as long as
you use only a stack's standard operations.

Example 1:

Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false

Constraints:

1 <= x <= 9
At most 100 calls will be made to push, pop, peek, and empty.
All the calls to pop and peek are valid.
 */
// Solution 1
class MyQueue {
    constructor() {
        this.pushStack = [];
        this.popStack = [];
    }

    push(val) {
        this.pushStack.push(val);
    }

    pop() {
        if (!this.popStack.length) {
            while (this.pushStack.length) {
                this.popStack.push(this.pushStack.pop());
            }
        }
        return this.popstack.pop();
    }

    peek() {
        if (!this.popStack.length) {
            while (this.pushStack.length) {
                this.popStack.push(this.pushStack.pop());
            }
        }
        return this.popStack[this.popStack.length - 1];
    }

    empty() {
        return !this.popStack.length && !this.pushStack.length;
    }
}
// --------------------------------------------------------------------------------------------------------------------------------

// Solution 2
var MyQueue = function () {
    this.arr = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.arr.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    return this.arr.shift();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    return this.arr[0];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.arr.length === 0;
};

// --------------------------------------------------------------------------------------------------------------------------------

// Solution 3
var MyQueue = function() {
    this.queue = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.queue = [...this.queue,x];
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    return this.queue.shift()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.queue[0];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.queue.length === 0;
};

// --------------------------------------------------------------------------------------------------------------------------------
// Solution 4

var MyQueue = function() {
    this.stack = [];
    this.helperStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.stack.length <= 1) return this.stack.pop();
    
    while (this.stack.length > 1) {
        this.helperStack.push(this.stack.pop());
    }
    
    const toReturn = this.stack.pop();
    
    while (this.helperStack.length > 0) {
        this.stack.push(this.helperStack.pop())
    }
    
    return toReturn;
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.stack.length <= 1) return this.stack[0]
    
    while (this.stack.length > 1) {
        this.helperStack.push(this.stack.pop());
    }
    
    const toReturn = this.stack[0];
    
    while (this.helperStack.length > 0) {
        this.stack.push(this.helperStack.pop())
    }
    
    return toReturn;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack.length === 0;
};

// ------------------------------
// Solution 5

var MyQueue = function() {
    this.stack1 = []
    this.stack2 = []
    this.front = null
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    if(this.stack1.length == 0) {
        this.front = x
    }
    this.stack1.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if(this.stack2.length == 0) {
        while(this.stack1.length !=0) {
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.stack2.length == 0 ? this.front : this.stack2[this.stack2.length-1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack1.length == 0 && this.stack2.length == 0
};