/* 
Task: Given an undirected graph with 𝑛 vertices and 𝑚 edges, compute the number of connected components
in it.
Input format: An undirected graph with 𝑛 vertices and 𝑚 edges. 
Output format: Output the number of connected components
*/

const readline = require("readline");

// read the input and print the output
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const edges = [];

  rl.question("", (line) => {
    const [numVertices, numEdges] = line.split(" ").map(Number);
    //if there is no edges, the number of CC is the number of vertices
    if (numEdges === 0) {
      console.log(numVertices);
      rl.close();
    }

    rl.on("line", (line) => {
      const [u, v] = line.split(" ").map(Number);
      edges.push([u, v]);

      if (edges.length === numEdges) {
        console.log(depthFirstSearch(edges, numVertices));
        rl.close();
      }
    });
  });
}

const depthFirstSearch = (edges, numVertices) => {
  const adjsList = makeAdjList(edges, numVertices);

  let ccNum = 0;
  for (let i = 1; i <= numVertices; i++) {
    const vertice = adjsList[i];
    if (!vertice.isVisited) {
      explore(adjsList, i, ccNum);
      //increase the number of connected components after visiting all the connected vertices to the starting vertice
      ccNum++;
    }
  }
  return ccNum;
};

const makeAdjList = (edges, n) => {
  const adjsList = {};
  // Helper function to add a vertex to the adjacency list
  const addVertex = (vertex) => {
    if (!adjsList[vertex]) {
      adjsList[vertex] = { isVisited: false, neighbours: [] };
    }
  };

  // Build the adjacency list by adding vertices and their neighbors
  for (const [u, v] of edges) {
    addVertex(u);
    addVertex(v);

    //add both vertices as each others neighbours because it is undirect graph
    adjsList[u].neighbours.push(v);
    adjsList[v].neighbours.push(u);
  }

  // Add vertices without neighbors (isolated vertices) to the adjacency list
  for (let i = 1; i <= n; i++) {
    addVertex(i);
  }

  return adjsList;
};

const explore = (adjsList, vertice, ccNum) => {
  // Mark the current vertex as visited
  adjsList[vertice].isVisited = true;

  const neighbours = adjsList[vertice].neighbours;
  // Explore all neighbors recursively
  for (const neighbour of neighbours) {
    if (!adjsList[neighbour].isVisited) {
      explore(adjsList, neighbour, ccNum);
    }
  }
};

main();
