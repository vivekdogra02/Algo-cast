// . Implement a function that returns a new object after squashing the input object.


function squashing(input) {

  function squash(obj) {
    // store result 
    const result = {};
    // traverse and if found nested properties, recursively call the function
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const nested = squash(obj[key]);
        for (const nestedKey in nested) {
          result[`${key}.${nestedKey}`] = nested[nestedKey];
        }
      } else {
        result[key] = obj[key]
      }
    }
    return result;

  }

  return squash(input)
}

// const inputObject = {
//   a: 1,
//   b: {
//     c: 2,
//     d: {
//       e: 3,
//     },
//   },
//   f: 4,
// };
const nestedObj = {
  person: {
    name: {
      first: 'John',
      last: 'Doe',
    },
    age: 30,
  },
  address: {
    city: 'New York',
    postal: '10001',
  },
};

const squashedObject = squashing(nestedObj);
console.log(squashedObject); //{ a: 1, 'b.c': 2, 'b.d.e': 3, f: 4 }


function squasting(input) {
  function squash(obj) {
    const result = {};

    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const nested = squash(obj[key]);

        for (let nestedKey in nested) {
          result[`${key}.${nestedKey}`] = nested[nestedKey];
        }
      } else {
        result[key] = obj[key]
      }
    }
    return result;
  }

  return squash(input);
}