/**
 * 74. Search a 2D Matrix
Medium
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.

Example 1:

Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104

 */
// Solution 1 // Naive solution
var searchMatrix = function (matrix, target) {
    let found = false;
    const len = matrix.length;
    for (let i = 0; i < len; i++) {
        const innerLen = matrix[i].length;
        for (let j = 0; j < innerLen; j++) {
            const first = matrix[i][j]
            const last = matrix[i][innerLen - 1];
            if (innerLen === 1) {
                if (first === target) {
                    return found = true;
                }
                break;
            } else {
                if (target >= first && target <= last) {

                    if (matrix[i][j] === target) {
                        return found = true;
                    }
                }
            }
        }
    }
    return found;
};

// Solution 2
// Efficient solution
function searchMatrix(matrix, target) {

    let row = matrix.length;
    let col = matrix[0].length;
    let isPresent = false;
    let i = 0, j = 0;
    for (i = 1; i < row; i++) {
        if (matrix[i][0] > target) break;
    }
    i--;
    for (j = 0; j < col; j++) {
        if (matrix[i][j] === target) {
            isPresent = true;
            break;
        }
    }
    return isPresent;

}

// Solution 3

var searchMatrix = function (matrix, t) {
    let k = matrix[0].length, j = (matrix.length * k) - 1, i = 0;
    while (i <= j) {
        const m = parseInt((i + j) / 2), r = parseInt(m / k), c = m % k;
        if (matrix[r][c] == t) return true;

        if (matrix[r][c] < t) i = m + 1;
        else j = m - 1;
    }

    return false;
};

//Solution 4

var searchMatrix = function (matrix, t) {
    let k = matrix[0].length, j = (matrix.length * k) - 1, i = 0;
    while (i <= j) {
        const m = parseInt((i + j) / 2), r = parseInt(m / k), c = m % k;
        if (matrix[r][c] == t) return true;

        if (matrix[r][c] < t) i = m + 1;
        else j = m - 1;
    }

    return false;
};

// Solution 5
var searchMatrix = function (matrix, target) {
    let l = 0, r = matrix.length * matrix[0].length
    const col = matrix[0].length
    while (l < r) {
        let m = l + Math.floor((r - l) / 2)
        if (matrix[Math.floor(m / col)][m % col] === target) return true
        else if (matrix[Math.floor(m / col)][m % col] > target) r = m
        else l = m + 1
    }
    return false
};

// Solution 6
var searchMatrix = function (matrix, target) {
    //find row == start
    let start = 0;
    let end = matrix.length - 1;
    while (start < end) {
        let mid = Math.ceil((start + end) / 2);
        if (target == matrix[mid][0])
            return true;
        else if (target > matrix[mid][0])
            start = mid;
        else
            end = mid - 1;
    }
    //find col
    row = start;
    start = 0;
    end = matrix[start].length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (target == matrix[row][mid])
            return true;
        else if (target > matrix[row][mid])
            start = mid + 1;
        else
            end = mid - 1;
    }

    return false;
};

// Solution 7
var searchMatrix = function (matrix, target) {
    var [m, n] = [matrix.length, matrix[0].length];

    var row, nextRow = matrix.find((v, i) => v[0] > target);
    if (nextRow === undefined) {
        row = matrix[matrix.length - 1];
    } else {
        var next = matrix.indexOf(nextRow);
        if (next === 0) return false;
        row = matrix[next - 1];
    }

    for (var j = 0; j < n; j++) {
        if (row[j] > target) return false;
        else if (target === row[j]) return true;
    }

    return false;
};

// Solution 8

const searchMatrix = function (matrix, target) {
    const cols = matrix[0].length;
    const rows = matrix.length;

    let top = 0;
    let bottom = rows - 1;
    let row = null;

    while (top <= bottom) {
        const middle = top + Math.floor((bottom - top) / 2)

        if (matrix[middle][0] > target) {
            bottom = middle - 1;
        } else if (matrix[middle][cols - 1] < target) {
            top = middle + 1;
        } else {
            row = matrix[middle];
            break;
        }
    }

    if (row) {
        let left = 0;
        let right = cols - 1;

        while (left <= right) {
            const middle = left + Math.floor((right - left) / 2);
            const val = row[middle];

            if (val > target) {
                right = middle - 1;
            } else if (val < target) {
                left = middle + 1;
            } else {
                return true;
            }
        }
    }

    return false;
};