// least efficient algo
// Bubble sort - more comparision and it is most simplest

// Time complexity - nested loops O(N^2) 
// Space complexity - O(1)

function BubbleSort(array) {
    const length = array.length;
    for(let i=0; i<length; i++) {
        for(let j=0 ; j<length; j++) {
            if(array[j] > array[j+1]) {
                // swap numbers
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
}