function customStringify(value) {
  // Handle different data types
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      // Handle arrays
      const elements = value.map((element) => customStringify(element));
      return `[${elements.join(',')}]`;
    } else {
      // Handle objects
      const properties = Object.keys(value).map((key) => `"${key}":${customStringify(value[key])}`);
      return `{${properties.join(',')}}`;
    }
  }
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
}

// Test the customStringify function
const data = {
  name: 'John',
  age: 30,
  isStudent: false,
  hobbies: ['Reading', 'Gaming', 'Hiking'],
  address: {
    city: 'New York',
    zipCode: '10001'
  }
};

const jsonString = customStringify(data);
console.log(jsonString);


function customStringify2(value) {
  if(value === null) {
    return 'null'
  }

  if(typeof value === 'object') {
    if(Array.isArray(value)) {
      // it is array
      const elements = value.map((el) => customStringify2(el))
      return `[${elements.join(',')}]`;
    } else {
      // it is an object
      const properties = Object.keys(value).map((key) => `"${key}" : ${customStringify2(value[key])}`);
      return `{${properties.join(',')}}`;
    }
  }

  if(typeof value === 'string') {
    return `"${value}"`
  }

  if(typeof value === 'number') {
    return value.toString();
  }

  if(typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }
}