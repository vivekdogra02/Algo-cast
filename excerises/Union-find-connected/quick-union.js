/* Quick - union (Lazy approach)
 Better than quick-find

 Data structure
 1. Integer array id[] size N
 2. Interpretation : id[i] is the parent of i.
 3. Root of i is id[id[id [id...]]]

 Find : check if p and q have same root.

 Union: To merge components containing p and q,
        set the id of p's root to the id of q's root

        ex: root of 3 is 9
            root of 5 is 6
            p and q are not connected

            To make it connected 
            :  Set the id of p's root to the id of q's root ie. 9 should be connected to 6
            means parent of 9 is now 6. 
 
 */  


 function quick_unionUF(N) {
    let id = [];
    id = new Array(N);
    for(let i = 0; i< N; i++) 
        id[i] = i;

    // Chase parent pointers until reach root
    function root(i) {
        while(i !== id[i])
        i = id[i];
        return i;
    }

    function connected(p, q) {
        return root(p) === root(q);
    }
    //  change root of p to the root of q.
    function union(p,   q) {
        let i  = root(p);
        let j = root(q);
        id[i] = j;
    }
 }

 /*
    Quick union 
    initialize  union  find
     N           N       N

    Defect 
    Quick-find :
    1. Union is too expensive 
    2. Trees are flat, but too expensive to keep them flat.

    Quick-Union: 
    1. Trees can be tall;
    2. Find too expensive (Could be N array access)
 */