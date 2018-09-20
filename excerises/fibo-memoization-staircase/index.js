/*
There exists a staircase with N steps, 
and you can climb up either 1 or 2 steps at a time. Given N,
write a function that returns the number of unique ways you can climb the staircase.
The order of the steps matters.

For example, if N is 4, then there are 5 unique ways:

1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2
What if, instead of being able to climb 1 or 2 steps at a time, 
you could climb any number from a set of positive integers X? 
For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.
*/

var staircase = (function() {
    var memo = {};

    function f(n) {
        var value;
        if(n in memo) {
            value = memo[x];
        } else {
            if( n === 0 || n===1) {
                return 1;
            } else {
                value = f(n-1) + f(n-2)
            }
            memo[n] = value;
        }
        return value;
    }
    return f;
})();

var fib = function(n) {
    if(n ===0 || n===1) return 1;
   let bottomup = new Array(n + 1);
    bottomup[0] = 1;
    bottomup[1] = 1;
    for(let i = 2; i<n; i++) {
        bottomup[i] = bottomup[i-1] + bottomup[i-2];
        return bottomup;
    } 
}

function fib(n, x) {
    if(n===0) return 1;
    let num = new Array(n);
    num[0] = 1;
    for(let i=1; i<n;i++) {
        total = 0;
        x.forEach(j => {
            if(i-j>=0) {
                total += num[i-j];
            }
            num[i] = total
        });
    }
    return num;
}