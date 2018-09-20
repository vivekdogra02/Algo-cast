
function productArray(arr) {
    let prod =  new Array(arr.length);
    let n = arr.length;
    let temp = 1;

    // initialze the prod with value 1
    for(let a in arr) {
        prod[a] = temp;
    }
    /* In this loop, temp variable contains product of
           elements on left side excluding arr[i] */
    for(let i in arr) {
        prod[i] = temp;
        temp *= arr[i];
    }
    temp = 1;

    /* In this loop, temp variable contains product of
           elements on right side excluding arr[i] */
           for (i = n - 1; i >= 0; i--) 
           {
               prod[i] *= temp;
               temp *= arr[i];
           }
    
           for(let i in prod) {
            console.log(prod[i]);
           }
        return;
}