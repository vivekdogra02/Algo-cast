function recursivelyTransform(obj, transformFn) {
  if (typeof obj !== 'object' || obj === null) {
    // If obj is not an object or is null, return it as is
    return transformFn(obj)
  }

  if (Array.isArray(obj)) {
    // If obj is an array, map and recursively transform its elements
    return obj.map((item) => recursivelyTransform(item, transformFn));
  }

  // If obj is an object, transform its values recursively
  const transformed = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      transformed[key] = recursivelyTransform(obj[key], transformFn);
    }
  }

  return transformFn(transformed);
}

// Example usage:
const data = {
  name: 'John',
  age: 30,
  mark: ['hello', 'test'],
  address: {
    street: '123 Main St',
    city: 'Sample City',
  },
};

// Define a transformation function (e.g., convert strings to uppercase)
function transformStringToUppercase(value) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
}

const transformedData = recursivelyTransform(data, transformStringToUppercase);
console.log(transformedData);
