// Gets linear time,When you are sure if the list is sorted o(n) otherwise returns O(N*N)
// Space complexity is O(1)
// Insert btw the it will come
const numbers = [10, 12, 4, 14, 1, 6, 3, 8, 2];

function insertionSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i] < array[0]) {
      //move number to the first position
      array.unshift(array.splice(i, 1)[0]);
    } else {
      // only sort number smaller than number on the left of it. 
      //This is the part of insertion sort that makes it fast if the array is almost sorted.
      if (array[i] < array[i - 1]) {
        //find where number should go
        for (var j = 1; j < i; j++) {
          if (array[i] >= array[j - 1] && array[i] < array[j]) {
            //move number to the right spot
            array.splice(j, 0, array.splice(i, 1)[0]);
          }
        }
      }
    }
  }
}

// Efficient way

function insertionSort(array) {
  for (var i = 0; i < array.length; i++) {
    let current = array[i];
    for (var j = i - 1; j >= 0 && array[j] > current; j--) {
      array[j + 1] = array[j];
    }
    array[j+1] = current;
    return array;
  }
}

  insertionSort(numbers);