/** 
 * Promise.allSettled()
The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise.
 This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed),
  with an array of objects that describe the outcome of each promise.
 * 
 * 
  */

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo'),
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status)),
);

// Expected output:
// "fulfilled"
// "rejected"


function promiseAllSettled(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError('promises arguments must be iterable'));
  }

  const settledPromise = [];
  let settledCount = 0;

  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        settledPromise[index] = { status: 'fulfilled', value }
      })
        .catch((reason) => {
          settledPromise[index] = { status: 'rejected', reason }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(settledPromise);
          }
        })
    });

    if (promises.length === 0) {
      resolve([]);
    }
  })
}


const p1 = Promise.resolve('Resolved value 1');
const p2 = Promise.reject('Error 2');
const p3 = new Promise((resolve) => setTimeout(() => {
  resolve('Value 3')
}, 1000));

promiseAllSettled([p1, p2, p3]).then((results) => {
  console.log('Results - ', results)
}).catch((error) => {
  console.log('Error -- ', error);
})