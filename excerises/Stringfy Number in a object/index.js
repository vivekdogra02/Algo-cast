/**
 * Write a function that will return all number present in a nested object to be string
 * 
 * eg:
 * let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}

return 


stringifyNumbers(obj)

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
 */

// Recursive solution - easy and simple
function stringifyNumbers(obj) {
    var newObj = {};

    for(var key in obj) {
        if(typeof obj[key] === 'number') {
            newObj[key] = obj[key].toString();
        } else if(typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            newObj[key] = stringifyNumbers(obj[key]);
        } else {
            newObj[key] = obj[key]
        }
    }
    return newObj;
}