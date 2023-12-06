/** Implement a function that merges two objects together */

// 1. Spread operator
function merge(obj1, obj2) {
  return {...obj1, ...obj2}
}

// 2. Object.assign

function mergeObjects(obj1, obj2) {
  return Object.assign({}, obj1, obj2);
}

// 3. Dont use built in methods
function merging(obj1, obj2) {
  const merged = {};

  for(let key in obj1) {
    if(obj1.hasOwnProperty(key)) {
      merged[key] = obj1[key]
    }
  }

  for(let key in obj2) {
    if(obj2.hasOwnProperty(key)) {
      merged[key] = obj2[key]
    }
  }

  return merged;

}

// Implement a function that merge any number of objects

// 1. Object. assign

function merge(objects) {
  return Object.assign({}, ...objects);
}

// 2. Spread operator and reduce

function merge(objects) {
return objects.reduce((result, obj) => ({...result, ...obj}), {});
}

// 3. Custom function implementation

function merge(objects){

  if(objects.length < 1) { return {}};

  // Initialize an empty object to store the merged result
  let mergedObjects = {}

  for(const obj of objects) {

    // check if the current item is an object
    if(typeof obj === 'object' && !Array.isArray(obj)) {
      // iterate through its properties

      for(const key of obj) {
        if(obj.hasOwnProperty(key)) {
          mergedObjects[key] = obj[key];
        }
      }
    }
  }
  return mergedObjects;
}

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { c: 5, d: 6 };

const merged = mergeObjects(obj1, obj2, obj3);
console.log(merged);