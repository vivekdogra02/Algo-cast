/**
 * Write a function which will print the maximum subarray sum
 * 
 * ex: 
 * ([2,6,9,2,1,8,5,6,3],subarray = 3)
 * return 19 as 8+5+6 as it is the maximum sum from an sub array
 * 
 */

function maxSubArraySum(arr,num) {

    if(num > arr.length) return null;
    let max = -Infinity;

    for(let i = 0; i < arr.length - num+1; i++) {

        let temp = 0;

        for(j=0;j<num;j++) {
            temp+=arr[i+j];
        }
        if(temp > max) {
            max = temp;
        }
    }
    return max;
}

// Efficient solution 

function maxSubArraySum(arr, num) {
    let tempSum = 0;
    let maxSum = 0;

    if(arr.length < num) return null;

    for(var i = 0; i < num; i++) {
        maxSum += arr[i];
    }

    tempSum = maxSum;

    for(let i = num; i< arr.length; i++) {
        tempSum = tempSum - arr[i-num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}