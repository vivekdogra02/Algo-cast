
// Implement an autocomplete system. 
//That is, given a query string s and a set of all possible query strings, 
//return all strings in the set that have s as a prefix.

//For example, given the query string de and the set of strings [dog, deer, deal],
// return [deer, deal]. 
//Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.

var arr = [dog, deer, deal];
var autocomplete = (query) => {
    return arr.filter(el => el.startsWith(query));
}

// output 
console.log(autocomplete('de'));
// return [deer, deal]. 
