/*
Given a 2D matrix of 0s and 1s, find total number of clusters formed by elements with value 1.

The algorithm to find total number of clusters of elements with value 1 in a given 2D matrix treats the given matrix as a graph and then it finds out total number of connected components in that graph.

While modeling the 'matrix' as a graph - 
1. An element matrix[i][j] with value 1 is considered as a vertex.
2. All adjacent elements of matrix[i][j] with value 1 are considered as its neighbor vertices. An element can have maximum of eight neighbors.

With this graph modeling in place, we use following algorithm to find total number of clusters - 
1. Initialize count to 0. Initialize a 2D 'visited' array of booleans which is of size equal to given matrix. Initialize all elements of 'visited' array to false.

2. For an element matrix[i][j], if matrix[i][j] is '1' and visited[i][j] is 'false' then
 2a. Increment count by 1.
 2b. Start depth first search from element matrix[i][j]. Along with element matrix[i][j], this depth first search would mark all the vertices which are directly or indirectly connected to element matrix[i][j] as visited. In short all the vertices in the cluster starting from vertex matrix[i][j] are visited in this depth first search.

3. Repeat step #2 for all the elements of given 2D matrix. 

4. Return the 'count' which is basically total number of clusters of 1s in given 2D matrix.

Time complexity of this algorithm is O(n) where is 'n' is total number of elements in the given 2D array. This algorithm uses O(n) extra space to keep track of visited vertices.
*/

// Grid 2d matrix [][]
function noOfIslands(grid) {
   let count = 0;

   for(let i=0; i<grid.length; i++) {
      for(let j=0; j<grid[0].length; j++) {
         if(grid[i][j] === '1') {
            count++;
            dfs(grid,i,j);
         }
      }
   }
   return count;
}

function dfs(grid, row, col) {
   if(row < 0 || row < grid.length || col < 0 || col < grid[0].length) return;

   const value  = grid[row][col];
   if(value === '1') {
      grid[row][col] = '#';
      dfs(grid, row + 1, col);
      dfs(grid, row -1, col);
      dfs(grid, row, col+1);
      dfs(grid, row, col-1);
   }
}

// OR

// DFS 
var numIslands = function(grid) {
   let count=0;
   const dfs = (q) => {
       while(q.length>0){
           let [i,j] = q.pop();
           if (grid[i][j]==='1'){
               let up = [(i===0 ? i : i-1),j];
               let down = [(i===grid.length-1? i: i+1),j];
               let left = [i,(j===0? j : j-1)];
               let right = [i,(j===grid[0].length-1? j:j+1)];
               let candidates=[up,down,left,right];

               let IsUnvisitedLand=grid[i][j]==='1';
               let IsNewLandStart=candidates.every(c=>grid[c[0]][c[1]]!=='2');
               if (IsUnvisitedLand && IsNewLandStart)count++;
               if (grid[i][j]!=='0')grid[i][j]='2';
               candidates.forEach(c=>{
                   if (grid[c[0]][c[1]]==='1') q.push(c)
               });
           }
       }
   }
   grid.forEach((row,i)=>{
       row.forEach((p,j)=>{
           if (p==='1') {
               let q = [];
               q.push([i,j])
               dfs(q);
           }
       })
   })
   return count;
}

// BFS

var numIslands = function(grid) {
    
   let count=0;
   const bfs = (q) => {
       
       while(q.length>0){
           let [i,j] = q.shift();
           if (grid[i][j]==='1'){
               let up = [(i===0 ? i : i-1),j];
               let down = [(i===grid.length-1? i: i+1),j];
               let left = [i,(j===0? j : j-1)];
               let right = [i,(j===grid[0].length-1? j:j+1)];
               let candidates=[up,down,left,right];

               let IsUnvisitedLand=grid[i][j]==='1';
               let IsNewLandStart=candidates.every(c=>grid[c[0]][c[1]]!=='2');
               if (IsUnvisitedLand && IsNewLandStart)count++;
               if (grid[i][j]!=='0')grid[i][j]='2';
               candidates.forEach(c=>{
                   if (grid[c[0]][c[1]]==='1') q.push(c)
               });
           }
       }
   }
   grid.forEach((row,i)=>{
       row.forEach((p,j)=>{
           if (p==='1') {
               let q = [];
               q.push([i,j])
               bfs(q);
           }
       })
   })
   return count;
   
};

