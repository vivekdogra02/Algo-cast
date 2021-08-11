/**
 * 
 * Write a function to search a substring in a string; This is what we call naive string search !!!
 * 
 * eg: woeoeomgowe  - find omg (if matches show else not found or -1)
 * 
 * psuedocode
 * 1. Loop over the longer string
 * 2. loop over the shorter string
 * 3. if the characters don't match, break the loop
 * 4. if the character matches, keep looping
 * 5. if you complete the inner loop, and find a match increment the count of matches
 * 6. return the count
 */

function naiveSearch(long, short) {
    var count = 0;
    for (var i = 0; i <long.length; i++) {
        for (var j = 0; j < short.length; j++) {
            if(short[j] !== long[i+j]) {
                break;
            } 
            if(j === short.length - 1) {
                count++;
            }
        }
    }
    return count;   
}

naiveSearch('heelo dee', 'eel')  /// gives 1