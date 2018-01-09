// Examples
// steps(2)
// '# '
// '##'
// steps(3)
//  '#  '
// '## '
// '###'


// Solution 1
function steps(n) {
    for (let row = 0; row < n; row++) {
        let stair = '';
        for (let col = 0; col < n; col++) {
            if (col <= row) {
                stair = '#'
            } else {
                stair = ' '
            }
        }
        console.log(stair);
    }
}

// solution 2 - Recursive solution
function steps(n, row = 0, stair = '') {
    if (n === row) {
        return;
    }
    if (n === stair.length) {
        console.log(stair);
        return steps(n, row + 1);
    }
    if (stair.length <= row) {
        stair += '#';
    } else {
        stair += ' ';
    }
    steps(n, row, stair);
}
console.log(steps(4))
module.exports = steps;