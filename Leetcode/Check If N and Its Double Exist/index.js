

// Solution 1

var checkIfExist = function (arr) {

    let exist = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === 2 * arr[j] || arr[i] === arr[j] / 2) {
                return true;
            }
        }
    }

    return false;
};

// Solution 2

var checkIfExist = function(array) {
    while (array.length) { 
      const n = array.pop() 
      if (array.includes(n*2) || array.includes(n/2)) return true
    }
    return false 
  }

// Solution 3
var checkIfExist = function(arr) {
    const idx = {};
    
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        
        if (idx[curr] !== undefined) {
            return true;
        }
        
        idx[curr * 2] = curr;
        
        if (isEven(curr)) idx[curr / 2] = curr;
    }
    
    return false;
};

function isEven(val){
    return val % 2 === 0;
}

// Solution 4
var checkIfExist = function(arr) {
    const hash = [];
    for (let num of arr) {
        if (hash[num] !== undefined) {
            return true;
        }
        
        // insert double the num and half if it's even
        hash[num * 2] = 1;
        if (num % 2 === 0) {
            hash[num / 2] = 1;
        }    
    }
    return false;
};



// Solution 5

var checkIfExist = function(arr) {
    let hash = {};
    
    for(let i = 0; i < arr.length; i++) {
        if(hash.hasOwnProperty(arr[i])) {
            return true;
        } else {
            const key1 = 2 * arr[i];
            const key2 = arr[i] / 2;
            hash[key1] = [i, arr[i]];
            hash[key2] = [i, arr[i]]
        }
    }
    
    
    return false;
};

// solution 6

var checkIfExist = function(arr) {
    return arr.some((item, idx) => {
        const targetIdx = arr.lastIndexOf(item / 2)
        return targetIdx >= 0 && targetIdx !== idx
    })
}