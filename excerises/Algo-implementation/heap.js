/* left child = i *2
right child = i *2 +1
parent = i/2
average and worst case  = O(nlogn)
*/

let minHeap = function() {
   let heap = [null];  // Adding index 0 with null value 

   this.insert = function(num) {
      heap.push(num); // push the number to the index 1

      // If heap has more than one element ie. root 
      if(heap.length > 2) {
         let idx = heap.length - 1; // index of last element
         let parent  = heap[Math.floor(idx/2)];
         // heap[idx] => last element
         while(heap[idx] < parent) {
            if(idx >=1) {
            // swap the last element with the root node
            [parent, heap[idx]] = [heap[idx], parent];
            if(parent > 1) {
               idx = Math.floor(idx/2);
            } else{
               break;
            }
            }
         }
      }
   }

   this.remove = function() {
      let smallest = heap[1]; // everytym remove the root node ie the smallest of all
      if(heap.length > 2) {
         heap[1] = heap[heap.length - 1]; // assign root node with the last node and then arrange accordingly
         heap.splice(heap.length -1); // remove the last node as it becomes the smallest node now

         if(heap.length > 3) { // means there is only two number in whole heap 
            if(heap[1] > heap[2]) {
               [heap[1], heap[2]] = [heap[2], heap[1]];
            }
            return smallest;
         };
         // if there are more than two nodes  
         let i = 1;
         let left = 2 * i;
         let right = 2 * i + 1;
         while(heap[i] >= heap[left] || heap[i] >= heap[right]) {
            if(heap[left] < heap[right]) {
               [heap[i], heap[left]] = [heap[left], heap[i]];
               i = 2 * i;
            } else {
               [heap[i], heap[right]] = [heap[right], heap[i]];
               i = 2 * i + 1;
            }
            // assigning the new left and new right
            left = 2 * i;
            right = 2 * i + 1;

            // if we are at the bottom, no node left
            if(heap[left] === undefined || heap[right]=== undefined) {
               break;
            }
         }
      } else if(heap.length === 2) {
         // only one element or node
         heap.splice(1,1);
      } else {
         // nothing is there
         return null;
      }
      return smallest;
   }

   // heap sort
 this.heapSort = function() {
    let result = new Array();
    while(heap.length > 1) {
       result.push(this.remove());
    }
    return result;
 }
}