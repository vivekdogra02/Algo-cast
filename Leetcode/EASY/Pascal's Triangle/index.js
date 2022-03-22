/**
 * Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:

Input: numRows = 1
Output: [[1]]
 */

// Solution 1

function pascalTriangle(numRows) {

    let result = [];
    if (numRows === 0) return result;
    result.push([1]);
    for (let i = 1; i < numRows; i++) {
        let prevRow = result[i - 1];
        let newRow = [];
        newRow.push(1);
        for (let j = 1; j < prevRow.length; j++) {
            newRow.push(prevRow[j - 1] + prevRow[j]);
        }
        newRow.push(1)
        result.push(newRow);
    }

    return result;
}

// Solution 2
var generate = function (numRows) {
    let result = [], temp = [];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                temp.push(1);
            }
            else {
                let val = result[i - 1][j] + result[i - 1][j - 1];
                temp.push(val);
            }
        }
        result.push(temp.slice());
        temp = [];
    }
    return result;
};

// Solution 3
var generate = function (numRows) {
    let resultArr = [];
    for (let i = 0; i < numRows; i++) {
        resultArr[i] = [];
        resultArr[i][0] = 1;
        resultArr[i][i] = 1;
        for (let j = 1; j < i; j++) {
            resultArr[i][j] = resultArr[i - 1][j] + resultArr[i - 1][j - 1];
        }
    }
    return resultArr;
};

// Solution 4
var generate = function (numRows) {
    /*First Eleement should be 1*/
    let pt = [[1]];
    for (let i = 1; i < numRows; i++) {
        let current = [];
        current.push(1); //Prepend with 1
        let temp = pt[i - 1];//Pick previous element
        for (let j = 0; j < temp.length - 1; j++) {
            /*Sum of previous rows -> [row-1][col-1] + [row-1][col]*/
            current.push(temp[j] + temp[j + 1]);
        }
        current.push(1);//append with 1
        pt.push(current);
    }
    return pt;
};

// Solution 5
var generate = function (numRows) {
    let arr = [[1]];
    for (let i = 1; i < numRows; i++) {
        let temp = [1];
        for (let j = 1; j < i; j++) {
            temp.push(arr[i - 1][j - 1] + arr[i - 1][j]);
        }
        temp.push(1);
        arr.push(temp);
    }

    return arr;
};

// Solution 6
var generate = function (numRows) {
    var i = 0;
    var j = 0;
    var res = [];
    for (i = 0; i < numRows; i++) {
        res.push(Array(i + 1));
        for (j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                res[i][j] = 1;
            } else {
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
            }
        }
    }
    return res;
};