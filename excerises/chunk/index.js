//Examples
//chunk([1,2,3,4,5],2) => [[1,2],[3,4],[5]]
//chunk([1,2,3,4,5],10) => [1,2,3,4,5]

//Solution 1
function chunk(arr, size) {
    const chunked = [];
    for (let i of arr) {
        const last = chunked[chunked.length - 1];
        if (!last || last.length === size) {
            chunked.push([i]);
        } else {
            last.push(i);
        }
    }
    return chunked;
}


// Solution 2 
function chunk(arr, size) {
    const chunked = [];
    let index = 0;
    while(index < arr.length) {
        chunked.push(arr.slice(index, index + size));
        index += size;
    }
    return chunked;

 }


console.log(chunk([1,2,3,4,5],2));
module.exports = chunk;