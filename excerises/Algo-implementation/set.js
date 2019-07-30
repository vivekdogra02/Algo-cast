class setClass {
   constructor() {
      this.collection = [];

      // Check whether the element is present in the collection or not
      this.has = function(value) {
         return (this.collection.indexOf(value) !== -1);
      }

      // this method will return all the values in the collection.
      this.values = function() {
         return this.collection;
      }

      // this method will add to the set
      this.add = function(element) {
         if(!this.has(element)) {
            this.collection.push(element);
            return true;
         }
         return false;
      }

      // this method will delete element from the set
      this.delete = function(element) {
         if(this.has(element)) {
            let index = this.collection.indexOf(element);
            this.collection.splice(index, 1);
            return true;
         }
         return false;
      }

      // will return the size of the collection
      this.size = function() {
         return this.collection.length;
      }

   }

   // Will return the Union of two sets.
   union = function(otherset) {
      var unionset = new setClass();
      var firstSet = this.values();
      var secondSet = otherset.values();

      firstSet.forEach(element => {
         unionset.add(element);
      });
      secondSet.forEach(ele => {
         unionset.add(ele);
      });
      return unionset;
   }

   // Will return the intersection of two sets, all items that are in both sets.
   intersection = function(otherset) {
      var intersectionset = new setClass();
      var firstSet = this.values();

      firstSet.forEach(ele => {
         if(otherset.has(ele)) {
            intersectionset.add(ele);
         }
      });
      return intersectionset;
   }
    
   // Difference btw in sets
   difference = function(otherset) {
      var differenceset = new setClass();
      var firstSet = this.values();
      firstSet.forEach(ele => {
         if(!otherset.has(ele)) {
            differenceset.add(ele);
         }
      });

      return differenceset;
   }

   // this method will test if the set is a subset of a different set
   subset = function(otherset) {
      var firstSet = this.values();
      return firstSet.every(val => {
         return otherset.has(val);
      })
   }

}

var a = new setClass();
var b = new setClass();
a.add('a');
b.add('b');
a.add('c');
b.add('a');
b.add('c');
