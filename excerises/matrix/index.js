// Examples - sprial matrix
// matrix(2)
// -- [[1,2],
//     [4,3]]

// matrix(3)
// [[1,2,3],
//  [8,9,4],
//  [7,6,5]]

function matrix(n) {
    const results = [];
    for (var i = 0; i < n; i++) {
        results.push([]);
    }
    let counter = 1;
    let startRow = 0;
    let endRow = n-1;
    let startColumn = 0;
    let endColumn = n - 1;

    while (startRow <= endRow && startColumn <= endColumn) {
        
        // Top row
        for (var i = startColumn; i < endColumn; i++) {
            results[startRow][i] = counter;
            counter++;           
        }
        startRow++;

        // Right Column
        for (var i = startRow; i <= endRow; i++) {
            results[i][endColumn] = counter;
            counter++;
        }
        endColumn--;

        // Bottom Row
        for (var i = endColumn; i >=startColumn; i--) {
            results[endRow][i] = counter;
            counter++;            
        }
        endRow--;

        // start Column
        for (var i = endRow; i >= startRow; i--) {
            results[i][startColumn] = counter;
            counter++;
        }
        startColumn++;
    }    
}
module.exports = matrix;