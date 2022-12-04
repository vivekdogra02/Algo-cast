/**
 * Depth first traversal - it first goes to the depth of the graph/tree and see the adjancent edges to go beyond the depth of that path
 *
 * It is implemented through - Stack only
 */

// Iterative solution

function depthFirstTraversal(graph, source) {
  // 1. Put the first element into a stack array

  const stack = [source];
  //  2. Run till the end of the array
  while (stack.length > 0) {
    const current = stack.pop();
    console.log(current);

    for (let neighbour of graph[current]) {
      stack.push(neighbour);
    }
  }
}

// Recursive solution
function recursiveDepthFirstTraversal(graph, source) {
  console.log(source);

  for (let neighbour of graph[source]) {
    recursiveDepthFirstTraversal(graph, neighbour);
  }
}

const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};
// depthFirstTraversal(graph, "a"); // acebdf
recursiveDepthFirstTraversal(graph, "a"); // abdfce
