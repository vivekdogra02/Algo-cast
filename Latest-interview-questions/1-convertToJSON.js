// Implement a function that converts a Javascript value into a JSON string.

function convertToJSON(value) {
  try {
    const jsonString = JSON.stringify(value);
    return jsonString;
  } catch (error) {
    console.error('Error while converting to JSON:', error);
    return null;
  }
}

const data = {
  name: "John",
  age: 30,
  city: "New York"
};

const jsonString = convertToJSON(data);
console.log(jsonString);