/**
 * 
 * Write a function that accepts an object and collect all the values in an array which are strings.
 * 
 * eg :
 * const obj = {
    stuff: "foo",
    data: {
        val: {
            thing: {
                info: "bar",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "baz"
                    }
                }
            }
        }
    }
}

collectStrings(obj) // ["foo", "bar", "baz"])
 */
// collectStrings Solution: Helper Method Recursion Version
function collectStrings(obj) {

    var arr = [];
    function gatherStrings(o) {
        for(var key in o) {
            if(typeof o[key] === 'string') {
                arr.push(o[key]);
            } else if(typeof o[key] === 'object')
            return gatherStrings(o[key]);
        }
    }
    gatherStrings(obj);
    return arr;
}


// Pure Recursion Version

function collectStrings(obj) {
    var newArr = [];
    for(var key in obj) {
        if(typeof obj[key] === 'string') {
            newArr.push(obj[key]);
        } else if(typeof obj[key] === 'object') {
            newArr = newArr.concat(collectStrings(obj[key]));
        }
    }
    return newArr;
}