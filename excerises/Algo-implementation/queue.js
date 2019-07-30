
// FIFO
class Queue {
   constructor() {
      var collection = [];
      this.print = function () {
         console.log(collection);
      };
      this.enqueue = function (e) {
         return collection.push(e);
      };
      this.dequeue = function () {
         return collection.shift();
      };
      this.front = function () {
         return collection[0];
      };
      this.size = function () {
         return collection.length;
      };
      this.isEmpty = function () {
         return collection.length === 0;
      };
   }
}
