function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let midIndex = arr.length / 2 | 0;

    let leftArr = arr.slice(0, midIndex);
    let rightArr = arr.slice(midIndex, arr.length);

    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge(left, right) {
    const result = [];

    while (left.length && right.length) {
        left[0] <= right[0] ? result.push(left.shift()) : result.push(right.shift())
    }

    while (left.length) result.push(left.shift())
    while (right.length) result.push(right.shift());

    return result;
}


const arr = [5, 4, 3, 1, 2]

console.log(mergeSort(arr))