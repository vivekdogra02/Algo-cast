/**
 * 
 * Radix sort work on numbers only. There is no comparision between numbers
 * Integer sorting
 * 
 * GetDigit function returns the digit in the num at a given place value
 * eg: getDigit(12345, 0) = returns 5 
 *     getDigit(12345, 1) = returns 4
 *     getDigit(12345, 2) = returns 3
 */

function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

/**
 * get Digit count - return the number of digits in a num
 * eg : digitCount(1) - 1
 * eg : digitCount(123) - 3
 * 
 */

function digitCount(num) {
    if(num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * Given an array of digits, returns the number of digits in the largest numbers in the list;
 *  eg; - mostDigits(nums)
 */
function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]))
    }
    return maxDigits;
}

/**
 * Radix sort implementation
 * Time complexity - O(nk)
 * space complexity - O(n + k)
 */

function radixSort(nums) {
    const maxDigitsCount = mostDigits(nums);
    for(let i = 0; i < maxDigitsCount; i++) {
        let digitsBuckets = Array.from({length: 10}, ()=> []);
        for (let i = 0; i < nums.length; i++) {
            const digit = getDigit(nums[i], k);
            digitsBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitsBuckets);
    }
    return nums;
}