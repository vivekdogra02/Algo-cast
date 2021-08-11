/**
 * 
 * Write a function that will flatten an array into
 * 
 * eg: 
 * 
 * [1, 2, 3,[4,5]] return [1, 2, 3, 4, 5]
 * [1,[3,[4]]] return [1,3,4] 
 * [[[[[[[[1,[[[3]]]]]]]]]]]  return [1,3]
 */

function flatten(oldArr) {
    var newArr = [];

    for(var i = 0; i < oldArr.length; i++) {
        if(Array.isArray(oldArr[i])) {
            newArr = newArr.concat(flattern(oldArr[i]));
        }else {
            newArr.push(oldArr[i]);
        }
    }
    return newArr;
}