/* 
Reorder Data in Log Files

You have an array of logs.  Each log is a space delimited string of words.

For each log, the first word in each log is an alphanumeric identifier.  Then, either:

Each word after the identifier will consist only of lowercase letters, or;
Each word after the identifier will consist only of digits.
We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

Return the final order of the logs.

 

Example 1:

Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
 

Constraints:

0 <= logs.length <= 100
3 <= logs[i].length <= 100
logs[i] is guaranteed to have an identifier, and a word after the identifier.
*/

// Solution 1
var reorderLogFiles = function(logs) {
   var letters = [], nums = [];
   
   // Separate digit-logs from letter-logs
   logs.forEach(function(log) {
       if((/[0-9]/i).test(log[log.indexOf(" ") + 1])) nums.push(log);
       else
           letters.push(log);
   });
   // Sort letter-logs
   letters.sort(function(a, b) {
       var cmp = a.slice(a.indexOf(" ")).localeCompare(b.slice(b.indexOf(" ")));
       return cmp === 0 ? a.localeCompare(b) : cmp;
   });
   
   return [...letters, ...nums];
};

// Solution 2
function reorderLogFiles(logs) {
   const body = s => s.slice(s.indexOf(' ') + 1); // get the body after identifier
   const isNumber = c => /\d/.test(c);
 
   // if body same then compare identifier
   const compare = (a, b) => {
     const n = body(a).localeCompare(body(b));
     if (n !== 0) return n;
     return a.localeCompare(b);
   };
 
   const digitLogs = [];
   const letterLogs = [];
   for (const log of logs) {
     if (isNumber(body(log))) {
       digitLogs.push(log);
     } else {
       letterLogs.push(log);
     }
   }
   return [...letterLogs.sort(compare), ...digitLogs];
 }

 // Solution 3
 var reorderLogFiles = function(logs) {
    
   function getLog(str){ // get after-identifier part of log
       return str.slice(str.indexOf(' ')+1);
   }    
   
   function isDigitalStr(str){  // the condition is that either ALL str[i] are digits or they ALL are symbols
                               // so we may check str[0] only
       return (str[0] >= '0' && str[0] <= '9') ? true : false;
   }
   
   function compare(a, b){  // main comparing function for 2 strings, if they're equal then compares identifiers
       let res = getLog(a).localeCompare(getLog(b));
       return (res == 0) ? a.slice(0, a.indexOf(' ')).localeCompare(b.slice(0, b.indexOf(' '))) : res;
   }
   
   let resLogs = []; // the resulting array: all digital logs will go into it befor symbol logs
   let symbolLogs = []; // the array for sorting symbol logs

   for(let i = 0; i < logs.length; i++){
       if(isDigitalStr(getLog(logs[i])))
           resLogs.push(logs[i]);
       else
           symbolLogs.push(logs[i]);
   }

   return [...symbolLogs.sort(compare), ...resLogs];
   
};
// Solution 4
var reorderLogFiles = function(logs) {
   let letters = [];
   const digits = []
   for(let i=0; i < logs.length; i++) {
     const log = logs[i]
     const id = log.substring(0, log.indexOf(' '));
     const logEntry = { id, log: log.substring(log.indexOf(' '))}
     if (/^\d+$/.test(logEntry.log.trim()[0])) {
       digits.push(log);
     } else {
       letters.push(logEntry)
     }
   }
   letters = letters.sort((a, b) => {
     if (a.log === b.log) {
       return a.id < b.id ? -1 : 1;
     }
     return a.log < b.log ? -1 : 1;
   }).map((v) => `${v.id}${v.log}`);
   return [...letters, ...digits];
 };

 // Solution 5
 var reorderLogFiles = function(logs) {
   let letter = [], digit = [];
   for(let v of logs) {
       if(v.split(" ")[1].charAt(0) >= '0' && v.split(" ")[1].charAt(0) <= '9'){
           digit.push(v);
       } else {
           letter.push(v);
       }
   }
   letter.sort(function (a, b) {
       return a.split(" ")[1].localeCompare(b.split(" ")[1]) || a.split(" ")[2].localeCompare(b.split(" ")[2])
   })
   return letter.concat(digit);
};

// Solution 6
var reorderLogFiles = function(logs) {
    
    
   let nums = []
   let words = []
   
   
   for(var i = 0; i<= logs.length - 1; i++){
       let index = logs[i].indexOf(" ");

       if(isNaN(parseInt(logs[i][index + 1]))){
          words.push(logs[i])
       }else{
           nums.push(logs[i])
       }
   }

   
   // Sort based on the word after the identifier
   words.sort(function(a,b){
       
       let indexA = a.indexOf(' ');
       let indexB = b.indexOf(' ');
       
       let strA = a.slice(indexA);
       let strB = b.slice(indexB);
       
       let result = strA.localeCompare(strB);
       
       if(!result){
           return a.localeCompare(b) // There's one test case where the identifiers have to be used in a tie
       }else{
           return result
       }
   });
   
   
   let res = [...words, ...nums];
   return res;
   
};