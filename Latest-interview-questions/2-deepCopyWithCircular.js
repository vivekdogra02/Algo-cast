/**
 * 2. Implement a function that performs a deep copy of a value, but also handles circular references.
 */

function deepCopyWithCircular(obj, copies = new WeakMap()) {

  // check if the object is already copied
  if (copies.has(obj)) {
    return copies.get(obj);
  }

  // Handle different types of object
  if (typeof obj === 'object' && obj !== null) {
    // create a new copy of object or array;
    let copy;
    if (Array.isArray(obj)) {
      copy = []
    } else {
      copy = Object.create(Object.getPrototypeOf(obj));
    }

    // stores the copy in the map
    copies.set(obj, copy);

    // Recursively copy all the properties

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopyWithCircular(obj[key], copies);
      }
    }
    return copy;
  } else {
    // Primitives and functions are directly copied
    return obj;
  }
}