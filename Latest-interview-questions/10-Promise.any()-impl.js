// Implement the functionality behaviour of Promise.any()
/**  
 * 
 * The Promise.any() method is used to wait for the first promise to be fulfilled, 
 * and it returns a new promise that is fulfilled with the value of the first fulfilled promise. 
 * If all the provided promises are rejected, it returns a rejected promise.
 * 
 *  Note that the Promise.any() method is not available in all JavaScript environments,
 *  so you may need to use a polyfill or a custom implementation if it's not supported.

Here's a custom implementation of Promise.any():
 */


const promise12 = Promise.reject(0);
const promise21 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise31 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise12, promise21, promise31];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises argument must be an iterable'));
    }

    if (promises.length === 0) {
      return reject(new AggregateError('No promises to fulfill'));
    }

    let fulfilled = false;
    const errors = [];

    for (const promise of promises) {
      Promise.resolve(promise)
        .then((value) => {
          if (!fulfilled) {
            fulfilled = true;
            resolve(value);
          }
        })
        .catch((error) => {
          errors.push(error);
          if (errors.length === promises.length) {
            reject(new AggregateError('All promises were rejected', errors));
          }
        });
    }
  });
}

// Example usage:
const promise1 = Promise.reject('Error 1');
const promise2 = Promise.resolve('Resolved value 2');
const promise3 = new Promise((resolve) => setTimeout(() => resolve('Resolved value 3'), 1000));

promiseAny([promise1, promise2, promise3])
  .then((value) => {
    console.log('Fulfilled:', value); // This will log 'Fulfilled: Resolved value 2'
  })
  .catch((error) => {
    console.error('Rejected:', error);
  });
