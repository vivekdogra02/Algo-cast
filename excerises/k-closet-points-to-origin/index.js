/* 
K Closest Points to Origin
We have a list of points on the plane.  Find the K closest points to the origin (0, 0).

(Here, the distance between two points on a plane is the Euclidean distance.)

You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)

 

Example 1:

Input: points = [[1,3],[-2,2]], K = 1
Output: [[-2,2]]
Explanation: 
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
(The answer [[-2,4],[3,3]] would also be accepted.)
 

Note:

1 <= K <= points.length <= 10000
-10000 < points[i][0] < 10000
-10000 < points[i][1] < 10000
*/

// Solution 1
var kClosest = function(points, K) {
   return points.sort((a, b) => a[0]*a[0]+a[1]*a[1] - b[0]*b[0] - b[1]*b[1]).slice(0,K);
};
const kClosest = (points, K) => points.sort(([x1, y1], [x2, y2]) => (x1 * x1 + y1 * y1) - (x2 * x2 + y2 * y2)).slice(0, K);

// -------------------------------------------------------------------------------------------------------------

// Solution 2
var kClosest = function(points, K) {
   return points.sort((a, b) => getLength(a) - getLength(b)).slice(0, K);
};

// we don't need to find square root of c here
// squared length is enough to determine order
var getLength = function([a, b]) {
   return (a * a) + (b * b);
}
// -------------------------------------------------------------------------------------------------------------
// Solution 3
const distance = a => {
   return (a[0] ** 2 + a[1] ** 2);
}

const swap = (arr, i, j) => {
   const tmp = arr[i];
   arr[i] = arr[j];
   arr[j] = tmp;
}

const partition = (arr, lo, hi) => {
   const pivot = distance(arr[hi]);
   
   let i = lo;
   for (let j = i; j < hi; j++) {
       if (distance(arr[j]) <= pivot) {
           swap(arr, i, j)
           i++
       }
   }
   
   swap(arr, i, hi);
   return i;
}

const quickSort = (arr, lo, hi, K) => {
   if (lo < hi) {
       const p = partition(arr, lo, hi);
       
       if (p == K - 1) {
           return;
       } else if (p < K){
           quickSort(arr, p + 1, hi, K);
       } else {
           quickSort(arr, lo, p - 1, K);
       }
   }
}

/**
* @param {number[][]} points
* @param {number} K
* @return {number[][]}
*/
var kClosest = function(points, K) {
   quickSort(points, 0, points.length - 1, K)
       
   return points.slice(0, K);
};
// -------------------------------------------------------------------------------------------------------------
// Solution 4

var kClosest = function(points, K) {
   let left = 0;
   let right = points.length - 1;
   while (left <= right) {
     const p = partition(points, left, right);
     if (K === p + 1) {
       return points.slice(0, K);
     } else if (K < p + 1) {
       right = p - 1;
     } else {
       left = p + 1;
     }
   }
   return [];
 };
 
 function partition(arr, start, end, compare = (a, b) => getDist(a) <= getDist(b)) {
   const p = end;
   let j = start;
   for (let i = start; i < end; i++) {
     if (compare(arr[i], arr[p])) {
       [arr[i], arr[j]] = [arr[j], arr[i]];
       j += 1;
     }
   }
   [arr[p], arr[j]] = [arr[j], arr[p]];
   return j;
 }
 
 function getDist([x, y]) {
   return Math.sqrt(x ** 2 + y ** 2);
 }
 // -------------------------------------------------------------------------------------------------------------
// Solution 5
var kClosest = function(points, K) {
   return points.sort((a,b)=> (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2) ).slice(0,K)
};
