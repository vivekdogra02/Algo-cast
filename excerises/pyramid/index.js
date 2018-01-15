// Example
// pyramid(1)
// '#'
// pyramid(2)
// ' # '
// '###'

// Solution 1
function pyramid(n) {
    const mid = Math.floor((2 * n -1 )/ 2);    
    for (let row = 0; row < n; row++) {
        let level = '';
        for (let col = 0; col < 2 * n - 1; col++) {
            if(mid - row <= col && mid + row >= col) {
                level += '#'
            } else {
                level += '';
            }
        }
        console.log(level);
    }
}

// Solution 2 // Recursive
function pyramid(n, row = 0,  level = '') {
    if( row === n) {
        return;
    }
    if( level.length === 2 * n -1) {
        console.log(level);
        return pyramid(n, row +1);
    }
    const mid = Math.floor((2 * n -1 )/ 2);
    let add;
    if(mid - row <= level.length && mid + row >= level.length) {
        add = '#'
    }else{
        add = ' '
    }
    pyramid(n, row, level + add);
    
}

module.exports = pyramid;