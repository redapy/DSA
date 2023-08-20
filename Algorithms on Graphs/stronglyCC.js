/*
Task: Compute the number of strongly connected components of a given directed graph with 𝑛 vertices and
𝑚 edges.
Input Format: first line contain the number vertices n and edges m. The next lines contains two vertices u
and v of the graph
Output Format: Output any topological ordering of its vertices. (Many DAGs have more than just one
topological ordering. You may output any of them).
Constraints: 1 ≤ 𝑛 ≤ 10^4, 0 ≤ 𝑚 ≤ 10^4.
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
    //if there is no edges, the number of strongly cc is the number of vertices
    if (numEdges === 0) {
      console.log(numVertices);
      rl.close();
    }

    // Read each line representing an edge and store it in the edges array
    rl.on("line", (line) => {
      const [u, v] = line.split(" ").map(Number);
      edges.push([u, v]);

      // If we have read all the edges, call the main algo function to print the result
      if (edges.length === numEdges) {
        console.log(getStronglyCC(edges, numVertices));
        rl.close();
      }
    });
  });
}

const getStronglyCC = (edges, numVertices) => {
  const { adjList, reversAdjList } = getGraphsRepresentation(
    edges,
    numVertices
  );

  let postvisit = 0;
  // helper function to explore the graph using DFS
  const explore = (graph, vertex) => {
    //Mark the current vertex as visited
    graph[vertex].isVisited = true;

    const neighbours = graph[vertex].neighbours;
    for (const neighbour of neighbours) {
      if (!graph[neighbour].isVisited) {
        explore(graph, neighbour);
      }
    }
    graph[vertex].postvisit = postvisit;
    postvisit++;
  };

  //Run the DFS on the reverse graph to get the post order of each vertex
  for (let i = 1; i <= numVertices; i++) {
    if (!reversAdjList[i].isVisited) {
      explore(reversAdjList, i);
    }
  }

  //get vertices in reverse postorder
  const vertices = Object.entries(reversAdjList)
    .sort((a, b) => b[1].postvisit - a[1].postvisit)
    .map((item) => item[0]);

  // run DFS on the original graph in reverse postorder to get the strongly CC
  let stronglyCc = 0;
  for (const vertex of vertices) {
    if (!adjList[vertex].isVisited) {
      explore(adjList, vertex);
      //once we explored all the reachable vertices from the current vertex, that's a strongly CC
      stronglyCc++;
    }
  }
  return stronglyCc;
};

// Function to create an adjacency list representation of the graph and reverse graph
const getGraphsRepresentation = (edges, numVertices) => {
  const adjList = {};
  const reversAdjList = {};
  //helper function to add a vertex to the adjList
  const addVertex = (list, vertex) => {
    if (!list[vertex]) {
      list[vertex] = { isVisited: false, neighbours: [] };
    }
  };

  for (const [u, v] of edges) {
    //initiliaze vertices in the normal graph
    addVertex(adjList, u);
    addVertex(adjList, v);
    //initiliaze vertices in the reverse graph
    addVertex(reversAdjList, u);
    addVertex(reversAdjList, v);

    // edge from u to v => v is a neighbour of u
    adjList[u].neighbours.push(v);
    //reverse the edge
    reversAdjList[v].neighbours.push(u);
  }

  // Add vertices without neighbors (isolated vertices) to the adjacency list
  for (let i = 1; i <= numVertices; i++) {
    addVertex(adjList, i);
    addVertex(reversAdjList, i);
  }

  return { adjList, reversAdjList };
};

main();
