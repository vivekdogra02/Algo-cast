
// Inefficient code  O(2^n)
function fibo(n) {
    if(n < 2){
        return n;
    }
    return fibo(n-1) + fib0(n-2);
}

// Using DP O(N) - closure

function fibo() {
    let cache = {};
    return function fib(n){
        if(n in cache) {
            return cache[n];
        } else {
            if(n < 2) return n;

            else {
                cache[n] = fib(n-1) + fib(n-2);
                return cache[n];
            }
        }
    }
}