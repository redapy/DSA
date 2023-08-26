/*
Task: Given an undirected graph with 𝑛 vertices and 𝑚 edges and two vertices 𝑢 and 𝑣, compute the length
of a shortest path between 𝑢 and 𝑣 (that is, the minimum number of edges in a path from 𝑢 to 𝑣).
Input Format: A graph is given in the standard format. The next line contains two vertices 𝑢 and 𝑣.
Constraints= 2 ≤ 𝑛 ≤ 10^5, 0 ≤ 𝑚 ≤ 10^5, 𝑢 !== 𝑣, 1 ≤ 𝑢, 𝑣 ≤ 𝑛.
Output Format: Output the minimum number of edges in a path from 𝑢 to 𝑣, or −1 if there is no path.
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
    //if there is no edges, there is no path.
    if (numEdges === 0) {
      return -1;
    }

    rl.on("line", (line) => {
      if (edges.length === numEdges) {
        const [u, v] = line.split(" ").map(Number);
        console.log(shortestPath(numVertices, edges, u, v));
        rl.close();
      } else {
        const [u, v] = line.split(" ").map(Number);
        edges.push([u, v]);
      }
    });
  });
}

const shortestPath = (n, edges, startingVertex, endVertex) => {
  const adjsList = getAdjList(edges, n);
  const queue = [startingVertex];
  adjsList[startingVertex].distance = 0;
  while (queue.length > 0) {
    const currentVertex = queue.shift();

    const neighbours = adjsList[currentVertex].neighbours;
    for (const neighbour of neighbours) {
      if (adjsList[neighbour].distance === -1) {
        queue.push(neighbour);
        adjsList[neighbour].distance = adjsList[currentVertex].distance + 1;
      }
    }
  }

  return adjsList[endVertex].distance;
};

const getAdjList = (edges, n) => {
  const adjsList = {};

  // Helper function to add a vertex to the adjacency list
  const addVertex = (vertex) => {
    if (!adjsList[vertex]) {
      adjsList[vertex] = { distance: -1, neighbours: [] };
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

main();
