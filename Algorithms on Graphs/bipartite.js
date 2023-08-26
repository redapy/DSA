/*
Task: Given an undirected graph with 𝑛 vertices and 𝑚 edges, check whether it is bipartite.
Input Format: An undirected graph with 𝑛 vertices and 𝑚 edges. 
Constraints: 1 ≤ 𝑛 ≤ 10^5, 0 ≤ 𝑚 ≤ 10^5
Output Forma: Output 1 if the graph is bipartite and 0 otherwise.
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
    //if there is no edges, or vertices the grapgh is not bipartite
    if (numEdges === 0 || numVertices === 0) {
      console.log(0);
      rl.close();
    }

    rl.on("line", (line) => {
      const [u, v] = line.split(" ").map(Number);
      edges.push([u, v]);

      if (edges.length === numEdges) {
        console.log(getIsBipartite(edges, numVertices));
        rl.close();
      }
    });
  });
}

// main Function to check if the graph is bipartite using BFS.
const getIsBipartite = (edges, n) => {
  const adjsList = getAdjList(edges, n);
  //get the first vertex in the list and initialiaze the queue
  const randomStartingVertex = edges[0][0];
  const queue = [randomStartingVertex];
  //assing a color to the starting vertex
  adjsList[randomStartingVertex].color = "white";

  while (queue.length > 0) {
    const processingVertex = queue.shift();
    const neighbours = adjsList[processingVertex].neighbours;
    const processingVertexColor = adjsList[processingVertex].color;
    // Vertices are colored as "white" and "black" alternatively. If any
    // adjacent vertices have the same color, the graph is not bipartite.
    for (const neighbour of neighbours) {
      const neighborColor = adjsList[neighbour].color;
      if (!neighborColor) {
        queue.push(neighbour);
        adjsList[neighbour].color = switchColor(processingVertexColor);
      } else if (processingVertexColor === neighborColor) {
        return 0;
      }
    }
  }
  return 1;
};

const getAdjList = (edges, n) => {
  const adjsList = {};

  // Helper function to add a vertex to the adjacency list
  const addVertex = (vertex) => {
    if (!adjsList[vertex]) {
      adjsList[vertex] = { color: null, neighbours: [] };
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

//helper function to switch colors
const switchColor = (color) => {
  switch (color) {
    case "white":
      return "black";
    case "black":
      return "white";
  }
};

main();
