/* 
Word Ladder

Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
Note:

Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.
Example 2:

Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: 0

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
*/

// Solution 1
function LadderLength(beginWord, endWord, wordList) {
   let len = 1;
   const dict = new Set(wordList);
   let q = [beginWord];

   while(q.length) {
      const next = [];
      for(let w of q) {
         if(w === endWord) return len;


         for(let i =0; i<w.length; i++) {
            for(let d=0; d<26; d++) {
               const w2 = w.slice(0, i) + String.fromCharCode(97+j) + w.slice(i+1);

               if(dict.size === 0) break;
               if(dict.has(w2)) {
                  next.push(w2);
                  dict.delete(w2);
               }
            }
         }
      }
      q = next;
      len++
   }
   return 0;
}

// Solution 2

adderLength(beginWord, endWord, wordList) {
   let len = 1;
   let queue = [beginWord];
   const dict = new Set(wordList);
   const seen = new Set(queue);
   
   while (queue.length) {
     const next = [];
     for (let v of queue) {
       if (v === endWord) {
         return len;
       }
       
       const arr = v.split('');
       for (let i = 0; i < arr.length; i++) {
         for (let d = 0; d < 26; d++) {
           arr[i] = String.fromCharCode(97+d);
           const nv = arr.join('');
           if (!seen.has(nv) && dict.has(nv)) {
             next.push(nv);
             seen.add(nv);
           }
           arr[i] = v[i];
         }
       }
     }
     queue = next;
     len++;
   }
   
   return 0;
 }

 // Solution 3

 class GraphNode {
   constructor(val) {
       this.val = val;
       this.children = [];
   }
   
   addChild(node) {
       this.children.push(node);
       return this;
   }
}

class Graph {
   constructor() {
       this.nodes = new Map();
   }
   
   add(val1, val2) {
       const node1 = this.nodes.get(val1) || new GraphNode(val1);
       const node2 = this.nodes.get(val2) || new GraphNode(val2);
       this.nodes.set(val1, node1.addChild(node2));
       this.nodes.set(val2, node2.addChild(node1));
   }
   
   get(val) {
       return this.nodes.get(val);
   }
}

function ladderLength(beginWord, endWord, wordList) {
   wordList.push(beginWord);
   const graph = buildGraph(wordList);

   let nodeBegin = graph.get(beginWord);
   let nodeEnd = graph.get(endWord);
   if (!nodeEnd) return 0;
   nodeBegin.distance = nodeEnd.distance = 1;
   nodeBegin.visitedBegin = nodeEnd.visitedEnd = true;
   
   const queueBegin = [nodeBegin];
   const queueEnd = [nodeEnd];
   
   while (queueBegin.length || queueEnd.length) {
       nodeBegin = queueBegin.shift() || new GraphNode();
       nodeEnd = queueEnd.shift() || new GraphNode();

       for (let child of nodeBegin.children) {
           if (child.visitedEnd) {
               return nodeBegin.distance + child.distance;
           } else if (!child.visitedBegin) {
               child.distance = nodeBegin.distance + 1;
               child.visitedBegin = true;
               queueBegin.push(child);
           }
       }
       
       for (let child of nodeEnd.children) {
           if (child.visitedBegin) {
               return nodeEnd.distance + child.distance;
           } else if (!child.visitedEnd) {
               child.distance = nodeEnd.distance + 1;
               child.visitedEnd = true;
               queueEnd.push(child);
           }
       }
   }
   
   return 0;
}

function buildGraph(wordList) {
   const graph = new Graph();
   const wordSet = new Set(wordList);
   const a = 'a'.charCodeAt(0);

   for (let word of wordSet) {
       for (let i = 0; i < word.length; i++) {
           for (let j = 0; j < 26; j++) {
               let transWord = word.substring(0, i) + String.fromCharCode(a + j) + word.substr(i + 1);
               if (wordSet.has(transWord) && transWord !== word) {
                   graph.add(word, transWord);
               }
           }
       }
   }

   return graph;
}
// shift is O(n) but fast in practice for non-large arrays - fast queues don't improve the speed of this particular problem.

// If you prefer a less redundant version, ladderLength can be factored to:

function ladderLength(beginWord, endWord, wordList) {
   wordList.push(beginWord);
   const graph = buildGraph(wordList);

   const nodeEnds = [graph.get(beginWord), graph.get(endWord)];
   if (!nodeEnds[1]) return 0;
   nodeEnds[0].distance = nodeEnds[1].distance = 1;
   nodeEnds[0].visited = [true, false];
   nodeEnds[1].visited = [false, true];
   
   const queues = [[nodeEnds[0]], [nodeEnds[1]]];
   
   while (queues[0].length || queues[1].length) {
       for (let i = 0; i < 2; i++) {
           nodeEnds[i] = queues[i].shift() || new GraphNode();
           
           for (let child of nodeEnds[i].children) {
               if (child.visited && child.visited[+!i]) {
                   return nodeEnds[i].distance + child.distance;
               } else if (!child.visited || !child.visited[i]) {
                   child.distance = nodeEnds[i].distance + 1;
                   child.visited = child.visited || [false, false];
                   child.visited[i] = true;
                   queues[i].push(child);
               }
           }
       }
   }
   
   return 0;
}


// Solution 4

var ladderLength = function(beginWord, endWord, wordList) {
   if(!wordList.includes(endWord)) return false;
   let reached=[beginWord], distance=1;
   while(!reached.includes(endWord)){
       let temArr=[];
       for(let each of reached){
           for(let i=0; i<each.length; i++){
               var curArr=each.split("");
               for(let k="a".charCodeAt(0); k<= "z".charCodeAt(0); k++){
                   curArr[i] = String.fromCharCode(k);
                   var tem=curArr.join("");
                   if(wordList.includes(tem)){
                       temArr.push(tem);
                       wordList.splice(wordList.indexOf(tem),1);
                   }
               }
           }
       }
       distance++;
       if(temArr.length ==0) return 0;
       reached=temArr;
   }
   return distance;
};