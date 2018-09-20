
// Data struture 
 // 1. Integer array id [] size N
 // 2. Interpretation: p and q are connected    iff they have same id

 // Find
 // Check if p and q have same id

 function quick_find(N) {
     let id = [];
     id = new Array[N]; 

     // set id of each object to itself 
     for(let i=0; i< N; i++) 
     id[i] = i;
 }

 // Check whether p and q are in the same component
 function connected(p, q, id) {
     return id[p] === id[q];
 }

 function union(p, q, id) {
     let pid = id[p];
     let qid = id[q];
     for(let i=0 ; i<id.length; i++) {
         // changes all the entries with id[p] to id[q] (at most 2N + 2 array access)
         if(id[i] === pid) {
             id[i] = qid;
         }
     }
 }


 // Analysis of the quick find (Too slow) - Quadratic
 // quick-find =  initialize  union  find
    //              N           N       1


// Quick - find defect - > Union is too expensive 