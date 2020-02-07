// Selection Sort
// Finding the next smallest element and arrange it in the above
// Time =  O(n^2)

function SelectionSort(array) {
    const length = array.length;

    for(let i=0; i<length; i++) {
        // Set current index as minimum
        let min = i;
        let temp = array[i];
        for(let j=0; j<length; j++) {
            // update min if current is lower than what we previously have
            if(array[j] < array[min]){
                min = j;
            }
        }
        array[i] = array[min];
        array[min] = temp;
    }
    return array;
}