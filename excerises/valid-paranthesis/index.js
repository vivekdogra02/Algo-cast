/* 

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true

*/
//Solution 1
function isValid(s) {
  var bracketsDictionary = {
    "{": "}",
    "[": "]",
    "(": ")"
  };
  var stack = [];

  for (let i = 0; i < s.length; i++) {
    if (bracketsDictionary[s.charAt(i)]) {
      stack.push(bracketsDictionary[s.charAt(i)]);
    } else {
      if (stack.pop() !== s.charAt(i)) {
        return false;
      }
    }
  }
  if (stack.length !== 0) return false;
  return true;
}

// Solution 2
function isValidP(s) {
  if (s.length === 0) return true;
  if (s.length === 1) return false;

  const bracketsStack = [];
  const splitStr = s.split("");
  const openBrackets = { ")": "(", "}": "{", "]": "[" };

  for (let i = 0; i < splitStr.length; i++) {
    if (!openBrackets[splitStr[i]]) {
      bracketsStack.push(splitStr[i]);
    } else {
      const topStack = bracketsStack.pop();
      if (openBrackets[splitStr[i]] !== topStack) return false;
    }
  }
  return bracketsStack.length === 0;
}

// Solution 3

function isValidpp(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let right = s[i] === ")" || s[i] === "}" || s[i] === "]";
    let left = s[i] === "(" || s[i] === "{" || s[i] === "[";

    //example case ")()()" return false
    if (right && stack.length === 0) {
      return false;
    }

    if (left) {
      stack.push(s[i]);
    }

    if (right) {
      let last = stack[stack.length - 1];
      if (s[i] === ")" && last != "(") {
        return false;
      } else if (s[i] === "}" && last != "{") {
        return false;
      } else if (s[i] === "]" && last != "[") {
        return false;
      } else {
        stack.pop();
      }
    }
  }

  if (stack.length > 0) {
    return false;
  }

  return true;
}


// Solution 4

var isValid = function(s) {
   let openBrackets = "({[";
   let closeBrackets = ")}]";
 
   let openStack = [];
 
   for (let val of s) {
     let openIndex = openBrackets.indexOf(val);
     let closeIndex = closeBrackets.indexOf(val);
 
     if (openIndex > -1) {
       openStack.unshift(openIndex);
     }
 
     if (closeIndex > -1) {
       if (closeIndex === openStack[0]) {
         openStack.shift();
       } else {
         return false;
       }
     }
   }
 
   return openStack.length === 0;
 };

 // solution 5

 var isValid = function(s) {
   if(s.length===0)
       return true;
   
   let myArr = [];
   
   for(let i=0; i<s.length; i++){
       if(s[i] === '(' || s[i] ==='[' || s[i] ==='{'){
           myArr.push(s[i]);
       }
       else{
           if(s[i] === ')' && myArr[myArr.length-1] !== '(')
               return false;
           if(s[i] === '}' && myArr[myArr.length-1] !== '{')
               return false;
           if(s[i] === ']' && myArr[myArr.length-1] !== '[')
               return false;
           myArr.pop();
       }
   }

   return myArr.length===0;
};

// Solution 6

var isValid = function(s) {
   let closers = []
   let valid = true
   for (var i = 0; i < s.length; i++) {
       let cur = s[i]
       switch(cur) {
           case '(':
               closers.push(')')
           break;
           case '[':
               closers.push(']')
           break;
           case '{':
               closers.push('}')
           break;
           case ')':
           case ']':
           case '}':
               if (cur != closers[closers.length-1]) {
                   valid = false
               } else {
                   closers.pop()
               }
           break;
       }
   }
   
   if (closers.length > 0) valid = false
   return valid
};

// Solution 7

var isValidParenthesis = function(s) {
  const stack = [];
   for (let i = 0; i < s.length(); i++) {
       var c = s.charAt(i);
       switch (c) {
           case '(': stack.push(')'); break;
           case '{': stack.push('}'); break;
           case '[': stack.push(']'); break;
           default:
               if (stack.length === 0 || stack.pop() != c) {
                   return false;
               }
       }


   }
   return stack.length === 0;
}