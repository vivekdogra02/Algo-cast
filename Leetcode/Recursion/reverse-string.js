/**
 * 
 * To reverse a stirng using recursion
 * 
 * input = vivek
 * output = keviv
 */


function reverse(s, i, j) {
    // Base case
    if (i > j) return;

    let temp = s[i];
    s[i] = s[j];
    s[j] = temp

    reverse(s, i, j);
}


reverse('vivek', 0, 4)