
// hash table

var hash = (string, max) => {
   var hash = 0;
   // max is the number of buckets;
   for (let i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i) ;      
   }
   return hash % max;
}


class HashTable {
   constructor() {
      let storage = [];
      let storageLimit = 4; // number of buckets.. 
      this.print = function () {
         console.log(storage);
      };
      this.add = function (key, value) {
         var index = this.hash(key, storageLimit);
         if (storage[index] === undefined) {
            storage[index] = [[key, value]];
         }
         else {
            var inserted = false;
            for (let i = 0; i < storage[index].length; i++) {
               if (storage[index][i][0] === key) {
                  storage[index][i][1] = value;
                  inserted = true;
               }
            }
            if (inserted === false) {
               storage[index].push([key, value]);
            }
         }
      };
      this.remove = function (key) {
         var index = this.hash(key, storageLimit);
         if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];
         }
         else {
            for (let i = 0; i < storage[index].length; i++) {
               if (storage[index][i][0] === key) {
                  delete storage[index][i];
               }
            }
         }
      };
      this.lookup = function (key) {
         var index = this.hash(key, storageLimit);
         if (storage[index] === undefined) {
            return undefined;
         }
         else {
            for (let i = 0; i < storage[index].length; i++) {
               if (storage[index][i][0] === key) {
                  return storage[index][i][1];
               }
            }
         }
      };
   }
}
