// Implement a function that returns a memoized version of a function which accepts any number of arguments.

function memoized(func) {
  let cache =  new Map();

  return function (...args) {
    const argsString = JSON.stringify(args);
    if(cache.has(argsString)) {
      console.log('From cache', cache);
      return cache.get(argsString)
    } else {
      const result = func(...args);
      cache.set(argsString, result);
      return result;
    }
  }
}

function sum(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}

const memoizedSum = memoized(sum);

console.log(memoizedSum(1, 2, 3)); // Computes and caches the result
console.log(memoizedSum(1, 2, 3)); // Retrieves the result from cache
console.log(memoizedSum(2, 3, 4)); // Computes and caches a new result
