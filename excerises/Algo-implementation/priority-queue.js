

// Fifo
class priorityQueue {
   constructor() {
      var collection = [];
      this.printCollection = function () {
         console.log(collection);
      };
      this.enqueue = function (e) {
         if (this.isEmpty()) {
            collection.push(e);
         }
         else {
            var added = false;
            for (let i = 0; i < collection.length; i++) {
               if (e[1] < collection[i][1]) { // checking priorities
                  collection.splice(i, 0, e);
                  added = true;
                  break;
               }
            }
            if (!added) {
               collection.push(e);
            }
         }
      };
      this.dequeue = function () {
         var value = collection.shift();
         return value[0];
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
