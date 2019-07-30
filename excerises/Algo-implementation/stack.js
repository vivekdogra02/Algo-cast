


class stack {
   constructor() {
      this.storage = {};
      this.count = 0;
      this.push = function (value) {
         this.storage[this.count] = value;
         this.count++;
      };
      this.pop = function () {
         if (this.count === 0) {
            return undefined;
         }
         this.count--;
         var result = this.storage[this.count];
         delete this.storage[this.count];
         return result;
      };
      this.size = function () {
         return this.count;
      };
      this.peek = function (value) {
         return this.storage[this.count - 1];
      };
   }
}

var myStack = new stack();
myStack.push('1');
myStack.pop('2');
myStack.peek();
myStack.pop();
myStack.size();


