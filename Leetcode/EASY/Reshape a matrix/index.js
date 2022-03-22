/**
 * 566. Reshape the Matrix

In MATLAB, there is a handy function called reshape which can reshape an m x n matrix 
into a new one with a different size r x c keeping its original data.

You are given an m x n matrix mat and two integers r and c 
representing the number of rows and the number of columns of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix 
in the same row-traversing order as they were.

If the reshape operation with given parameters is possible and legal, 
output the new reshaped matrix; Otherwise, output the original matrix.

Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]

Input: mat = [[1,2],[3,4]], r = 2, c = 4
Output: [[1,2],[3,4]]

 */

// Solution 1

var matrixReshape = function (mat, r, c) {
    const maxMatrix = r * c;
    let col = 0;
    let row = 0;
    let ans = Array(r).fill().map(() => Array(c));
    if (mat.length * mat[0].length !== maxMatrix) return mat;

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            ans[row][col] = mat[i][j]
            col++;
            if (col === c) {
                row++;
                col = 0;
            }
        }
    }
    return ans;
};

// Solution 2

var matrixReshape = function (mat, r, c) {
    let outMat = [];
    let colCount = 0;
    let rowCount = 0;
    let originalMatRows = mat.length;
    let originalMatCols = mat[0].length
    if (originalMatRows * originalMatCols !== r * c) return mat;
    for (let ro = 0; ro < r; ro++) {
        let newRow = [];
        for (let co = 0; co < c; co++) {
            newRow[co] = mat[rowCount][colCount];
            colCount++;
            if (colCount == originalMatCols) {
                colCount = 0;
                rowCount += 1;
            }
        }
        outMat.push(newRow);
    }
    return outMat;
};

// Solution 3
var matrixReshape = function (mat, r, c) {
    var result = [].concat(...mat);
    if (result.length !== r * c) return mat;
    let newArr = [];
    for (let i = 0; i < r; i++) {
        newArr[i] = [];
        newArr[i] = result.slice(i * c, c + i * c);
    }
    return newArr;
}

// Solution 4

var matrixReshape = function (mat, r, c) {
    let ans = []
    if (mat.length * mat[0].length != r * c) return mat
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            if (ans.length == 0) {
                ans.push([mat[i][j]])
            } else if (ans[ans.length - 1].length < c) {
                let temp = ans.pop();
                temp.push(mat[i][j])
                ans.push(temp);
            } else {
                ans.push([mat[i][j]])
            }
        }
    }

    // Solution 5
    var matrixReshape = function (mat, r, c) {
        var [m, n] = [mat.length, mat[0].length];
        if (m * n !== r * c) return mat;
        var flat = mat.flat();
        if (r === 1) return [flat];
        else {
            var result = [];
            for (var i = 0; i < r; i++) {
                result.push(flat.splice(0, c));
            }
            return result;
        }
    }
}
