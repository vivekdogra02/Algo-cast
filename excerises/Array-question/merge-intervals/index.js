/* 
Merge Intervals
Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
*/

// Solution 1

function  merge(intervals) {
   if(!intervals.length) return intervals;
   // sort 
   intervals.sort((a,b) => a[0] - b[0]);

   var prev = intervals[0];
   var res = [prev];

   for(let curr of intervals) {
      if(curr[0] <= prev[1]) {
         prev[1] = Math.max(prev[1], curr[1])
      } else {
         res.push(curr);
         prev = curr;
      }
   }
   return res;
}

// Solution 2

var merge = function(intervals) {
   // 1. Sort
   intervals.sort((a, b) => a[0] - b[0]);
   // 2. Traverse
   if(!intervals.length)
       return [];
   let begin = intervals[0][0],
       end = intervals[0][1];
   let res = [];
       
   for(let i = 1; i < intervals.length; ++i) {
       if(intervals[i][0] > end) {
           res.push([begin, end]);
           begin = intervals[i][0];
           end = intervals[i][1]
       } else {
           end = Math.max(end, intervals[i][1])
       }
   }
   res.push([begin, end]);

   return res;
   
};

// Solution 3
var merge = function(intervals) {
   
   const n = intervals.length;
     if (n === 0) return [];
     if (n === 1) return intervals;
     
     intervals = intervals.sort(function(a, b) { return a[0]-b[0]; });
     let output = [];
     let prev = intervals[0];
     
     for (let i=1; i<n; i++) {
         if (prev[1] >= intervals[i][0]) {
             prev = [
                 Math.min(prev[0], intervals[i][0]), 
                 Math.max(prev[1], intervals[i][1])
             ];
         } else {
             output.push(prev);
             prev = intervals[i];
         }
     }
     output.push(prev);
     return output;
 };

 // Solution 4
 var merge = function(intervals) {
   
   var orderedArray = [];
     for(let i =0; i < intervals.length; i++) {
         let startInterval = intervals[i][0];
         let endInterval = intervals[i][1];
         if(!orderedArray[startInterval])
             orderedArray[startInterval] = 0 
         if(!orderedArray[endInterval])
             orderedArray[endInterval] = 0 
         orderedArray[startInterval] += 1;
         orderedArray[endInterval] -= 1;
     }
     var resultSet = [];
     var intervalStart = undefined;
     var count = 0;
     var keys = Object.keys(orderedArray);
     keys.forEach(function(i) {
         curVal = orderedArray[i];
         if(curVal === 0 && intervalStart === undefined)
             resultSet.push([i,i]);
         else if(curVal > 0 && intervalStart === undefined) {
             intervalStart = i;
             count = curVal;
         }
         else {
             count += curVal;
             //end of an interval
             if(count == 0) {
                 resultSet.push([intervalStart, i]);
                 //reset interval
                 intervalStart = undefined;
             }
         }
     });
    return resultSet;
 };

 // Solution 5
 var merge = function(intervals) {
   
   if (!intervals || !intervals.length) return [];
     
     intervals.sort((a,b) => a[0] - b[0]);
     
     let result = [intervals[0]];
     for (let i = 0;i < intervals.length;i++) {
         if (intervals[i][0] <= result[result.length-1][1]) {
             result[result.length-1][1] = Math.max(intervals[i][1], result[result.length - 1][1]);
         } else result.push(intervals[i]);
     }
     return result;
 };

 // Solution 6
 var merge = function(intervals) {
   
   intervals = intervals.sort((a, b) => a[0] - b[0]);
      const res = [];
      intervals.map(d => {
          if (res.length === 0) {
              res.push(d);
          } else {
              const last = res[res.length - 1];
              if (last[1] < d[0]) {
                  res.push(d);
              } else {
                  last[1] = Math.max(last[1], d[1]);
              }
          }
      });
      return res;
  };