/**
 * Count unique value in array 
 * ex
 * [1,1,1,1,1,2]  => 2
 * [1,2,2,3,3,4,4,4,4,5,7,19] = 7
 * [-1,-2,0,1,2,4] =  6
 * [] = 0
 */

function countUniqueValues(array) {
        if(!array.length) return 0;
        let i = 0;
        for(let j = 1; j < array.length; j++) {
            if(array[i] !== array[j]) {
                i++;
                array[i] = array[j];
            }
        }
        return i + 1;
}