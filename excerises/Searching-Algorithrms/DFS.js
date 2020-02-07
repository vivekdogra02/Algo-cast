// Depth first search
// Going from level to level from left till end and then to  start from again the same point
// Time complexity of both BFS and DFS is same, they all have to visit the node for once. O(N)
// 
 /* 
 pros
 1. Less memory 
 2.   Does the path exist?

 cons
 1. can get slow  
 
 Interview questions
 
 //If you know a solution is not far from the root of the tree:
BFS

//If the tree is very deep and solutions are rare, 
BFS (DFS will take long time. )

//If the tree is very wide:
DFS (BFS will need too much memory)

//If solutions are frequent but located deep in the tree
DFS

//determining whether a path exists between two nodes
DFS

//Finding the shortest path
BFS
 */