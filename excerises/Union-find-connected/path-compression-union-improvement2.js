/* 
    Quick union with path compression:
    Just after computing the root of p, set the id of each examined node to the point to that root.

    Two pass implementation : 
     =>  Add second loop to root() to set the id[] of each examined node to the root.

    Simpler one pass variant : Make every other node in the path point to its grandparent (thereby halving path length)

    function root(i) {
        while(i !== id[i]){
            id[i] = id[id[i]];  ->>>>>> only one extra line of code 
            i = id[i];
        }
        return i;
    }

*/

