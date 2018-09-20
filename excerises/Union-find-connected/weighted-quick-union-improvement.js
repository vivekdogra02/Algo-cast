/*
Improvement 1: Weighted quick union
 1. Modify quick union to avoid tall trees.
 2. keep track of size of each tree
 3. Balance by linking root of the smaller tree to the root of larger tree.
 `(reasonable alternatives)
    - > Union by height or rank

    Always think the smaller tree will go below 

    Same data structure of quick union

    Union operation : Slight change 
    1. Link the root of smaller tree to the root of larger tree
    2. update the sz[] array.


Same as quick union but maintain extra array sz[i] : 
 - > To count the number of objects in the tree rooted at i.

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
        // slight change
        if(i === j) return;
        if(sz[i] < sz[j]) {
            id[i] = j;
            sz[j] += sz[i];
        } else {
            id[j] = i;
            sz[i] += sz[j];
        }
    }
 }

 /* 
 Running time
 1. Find -> takes time proportional to the depth of p and q.
 2. Union => takes constant time , given roots;


 N = 10
 depth(x) = 3 * logN
 initialize  union  find
     N       LogN    LogN
 */