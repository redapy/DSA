/*
Task: Compute a topological ordering of a given directed acyclic graph (DAG) with 𝑛 vertices and 𝑚 edges.
Input Format: first line contain the number vertices n and edges m. The next lines contains two vertices u
and v of the graph
Output Format: Output any topological ordering of its vertices. (Many DAGs have more than just one
topological ordering. You may output any of them).
Constraints: 1 ≤ 𝑛 ≤ 10^5, 0 ≤ 𝑚 ≤ 10^3.

*/
const readline = require("readline");
// read the input and print the output
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const edges = [];
  // Read the first line which contains the number of vertices and edges
  rl.question("", (line) => {
    const [numVertices, numEdges] = line.split(" ").map(Number);
    //if there is no edges, then the smallest vertex comes last
    if (numEdges === 0) {
      const result = Array.from({ length: numVertices }, (_, i) => i + 1)
        .reverse()
        .join(" ")
        .trim();
      console.log(result);
      rl.close();
    }

    // Read each line representing an edge and store it in the edges array
    rl.on("line", (line) => {
      const [u, v] = line.split(" ").map(Number);
      edges.push([u, v]);

      // If we have read all the edges, call the main algo function to print the result
      if (edges.length === numEdges) {
        console.log(topoSort(edges, numVertices));
        rl.close();
      }
    });
  });
}

const topoSort = (edges, numVertices) => {
  const adjList = makeAdjList(edges, numVertices);
  let postvisit = 0;

  // Helper function to explore the graph using DFS
  const explore = (vertex) => {
    adjList[vertex].isVisited = true;
    const neighbours = adjList[vertex].neighbours;

    for (const neighbour of neighbours) {
      if (!adjList[neighbour].isVisited) {
        explore(neighbour);
      }
    }

    adjList[vertex].postvisit = postvisit;
    postvisit++;
  };

  for (let i = 1; i <= numVertices; i++) {
    if (!adjList[i].isVisited) {
      explore(i);
    }
  }

  //Sort vertices by reverse post-order
  const result = Object.entries(adjList)
    .sort((a, b) => b[1].postvisit - a[1].postvisit)
    .map((vertex) => vertex[0])
    .join(" ")
    .trim();

  return result;
};

// Function to create an adjacency list representation of the graph, and intialize vertices state
const makeAdjList = (edges, numVertices) => {
  const adjList = {};
  //helper function to add a vertex to the adjList
  const addVertex = (v) => {
    if (!adjList[v]) {
      adjList[v] = { isVisited: false, neighbours: [] };
    }
  };

  for (const [u, v] of edges) {
    addVertex(u);
    addVertex(v);
    adjList[u].neighbours.push(v);
  }

  // Add vertices without neighbours (isolated vertices) to the adjacency list
  for (let i = 1; i <= numVertices; i++) {
    addVertex(i);
  }

  return adjList;
};

main();
