// find using boolean operation only among 3 numbers
function max (a,b,c) {
    var maximum = a;
    // set max to b if and only if max is less than b
    (maximum < b) && (maximum = b);
    // set max to c if and only if max is less than c
    (maximum < c) && (maximum = c);
    return maximum;
}
function minimum(a,b,c) {
    var min = a;
    // set max to b if and only if max is less than b
    (min > b) && (min = b);
    // set max to c if and only if max is less than c
    (min > c) && (min = c);
    return min;
 }