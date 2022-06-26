// Examples - Same number and quantity of each only characters(except spaces, punctuation marks)
// in both string, Consider Capital letters to be the same as lower case
// anagrams('rail safety', 'fairy tales') -- > True
// anagrams('RAIL! SAFETY!', 'fairy tales') === > True
// anagrams('Hi there', 'Bye there') --- > False


// Solution 1
function anagrams(str1, str2) {
    const aCharMap = buildCharMap(str1);
    const bCharMap = buildCharMap(str2);
    if (Object.keys(aCharMap).length !== Object.keys(bCharMap).length) {
        return false;
    }
    for (let char in aCharMap) {
        if (aCharMap[char] !== bCharMap[char]) {
            return false;
        }
    }
    return true;
}
function buildCharMap(str) {
    const charMap = {};
    const replacedStr = str.replace(/[^\w]/g, '').toLowerCase()
    for (let char of replacedStr) {
        charMap[char] = charMap[char] + 1 || 1;
    }
    return charMap;
}


// Solution 2
function anagrams(str1, str2) {
    const firstStr = cleanedStr(str1);
    const secondStr = cleanedStr(str2);
    return firstStr === secondStr;
}
function cleanedStr(str) {
    // Sort and replace all spaces, punctuation marks etc.
    return str.replace(/[^\w]/g,'')
    .toLowerCase()
    .split('')
    .sort()
    .join('');
}

function isValidAnagram(s,t) {
    let map = {};
    s.split('').map(c => map[c] =  map[c] ? map[c] + 1: 1);
    t.split('').map(c => map[c] =  map[c] ? map[c] - 1: 1);

    return Object.keys(map).every(x => map[x] === 0);
}
console.log(anagrams('helc!','chel'))
module.exports = anagrams;