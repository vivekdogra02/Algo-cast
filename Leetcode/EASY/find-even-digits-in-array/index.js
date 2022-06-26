/***
 * Find even digits of numbers in an array of numbers
 * 
 * [1,45,133,4331,51] -> output = 3
 */

function findEvenDigits(nums) {
    let count = 0;
 // base case
    if(nums.length === 0) return 0;

    for(let i = 0; i < nums.length; i++) {
        let digits = 0;

        while(nums[i] > 0) {
            digits += 1;
            nums[i] = Math.floor(nums[i] / 10) // to get the next digit
        }

        if(digits % 2 === 0) {count++;}
    }
    return count;
}