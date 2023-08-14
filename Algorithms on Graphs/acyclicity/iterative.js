/*
Task: Check whether a given directed graph with 𝑛 vertices and 𝑚 edges contains a cycle.
Input Format: first line contain the number vertices n and edges m. The next lines contains two vertices u
and v of the graph
Constraints: 1 ≤ 𝑛 ≤ 10^3, 0 ≤ 𝑚 ≤ 10^3.
Output Format. Output 1 if the graph contains a cycle and 0 otherwise.
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
    //if there is no edges, then there is no cyle
    if (numEdges === 0) {
      console.log(0);
      rl.close();
    }

    // Read each line representing an edge and store it in the edges array
    rl.on("line", (line) => {
      const [u, v] = line.split(" ").map(Number);
      edges.push([u, v]);

      // If we have read all the edges, call the main algo function to print the result
      if (edges.length === numEdges) {
        console.log(getIsCyclic(edges, numVertices));
        rl.close();
      }
    });
  });
}

const getIsCyclic = (edges, numVertices) => {
  const adjsList = makeAdjList(edges, numVertices);

  // Helper function to explore the graph using DFS
  const explore = (vertex) => {
    //Mark the vertex as part of the path we are exploring
    adjsList[vertex].state = 1;
    //Initialize the stack
    const stack = [vertex];
    while (stack.length > 0) {
      const currentVertex = stack[stack.length - 1];
      const neighbours = adjsList[currentVertex].neighbours;
      let hasUnvisitedNeighbour = false;
      for (const neighbour of neighbours) {
        const neighbourState = adjsList[neighbour].state;
        if (neighbourState === 0) {
          //mark the current neighbour as part of the path we are exploring
          adjsList[neighbour].state = 1;
          stack.push(neighbour);
          hasUnvisitedNeighbour = true;
          break;
        } else if (neighbourState === 1) {
          return true; // Cycle detected
        }
      }

      //once all the neighbours has been visited, mark the current vertex as visited and remove it from the stack
      if (!hasUnvisitedNeighbour) {
        adjsList[currentVertex].state = 2;
        stack.pop();
      }
    }
    return 0;
  };

  for (let i = 1; i <= numVertices; i++) {
    if (adjsList[i].state === 0 && explore(i)) {
      return 1;
    }
  }

  return 0;
};

// Function to create an adjacency list representation of the graph, and intialize vertices state
const makeAdjList = (edges, n) => {
  const adjsList = {};

  //helper function to add a vertex to the adjList
  const addVertex = (v) => {
    if (!adjsList[v]) {
      // states: 0: not visited, 1: visiting, 2: visited
      adjsList[v] = { state: 0, neighbours: [] };
    }
  };

  for (const [u, v] of edges) {
    addVertex(u);
    addVertex(v);
    adjsList[u].neighbours.push(v);
  }

  // Add vertices without neighbors (isolated vertices) to the adjacency list
  for (let i = 1; i <= n; i++) {
    addVertex(i);
  }

  return adjsList;
};

main();
