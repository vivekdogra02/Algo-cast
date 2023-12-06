// Implement a function that determines if two values are deep equal.

function deepEqual(a,b) {
  // Check if the type of a & b is same
  if(typeof a !== typeof b) {
    return false;
  }

  // check if both values are objects
  if(typeof a === 'object' && a!== null  && typeof b === 'object' && b!== null) {
    const keyA = Object.keys(a);
    const keyB = Object.keys(b);

    // check if the keys are of same length
    if(keyA.length !== keyB.length) {
      return false;
    }

    // Recursively check for all the keys

    for(let key of keyA) {
      if(!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true; // if all the keys are the same
  } else {
    // check for primitives types
    return a===b;
  }
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };

const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];

console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(arr1, arr2)); // true