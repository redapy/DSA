/* 
Input format: An undirected graph with 𝑛 vertices and 𝑚 edges. The next lines contains two vertices u
and v of the graph. 
Output format: 1 if there is a path between 𝑢 and 𝑣 and 0 otherwise
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

    rl.on("line", (line) => {
      if (edges.length === numEdges) {
        const [u, v] = line.split(" ").map(Number);
        console.log(findExit(edges, u, v));
        rl.close();
      } else {
        const [u, v] = line.split(" ").map(Number);
        edges.push([u, v]);
      }
    });
  });
}

const findExit = (edges, startVertex, targetVertex) => {
  const adjsList = makeAdjList(edges);
  return explore(startVertex, targetVertex, adjsList);
};

// create an adjency list representation of the graph
const makeAdjList = (edges) => {
  const adjsList = {};
  edges.forEach(([u, v]) => {
    //Initialize the vertices
    if (!adjsList[u]) {
      adjsList[u] = { isVisited: false, neighbours: [] };
    }
    if (!adjsList[v]) {
      adjsList[v] = { isVisited: false, neighbours: [] };
    }
    //add both vertices as each others neighbours because it is undirect graph
    adjsList[u].neighbours.push(v);
    adjsList[v].neighbours.push(u);
  });

  return adjsList;
};

const explore = (startVertex, targetVertex, adjsList) => {
  //check first that both vercies are in the adjency list => if not that means they don't have neighbours, hence they are not reachable
  if (!adjsList[startVertex] || !adjsList[targetVertex]) {
    return 0;
  }

  if (startVertex === targetVertex) {
    return 1;
  }

  const neighbours = adjsList[startVertex].neighbours;
  //mark u as visited so we do not explore it again
  adjsList[startVertex].isVisited = true;

  // for each neighbour of u, explore its neighbours
  for (const neighbour of neighbours) {
    // only explore neighbours that has never been visited
    if (!adjsList[neighbour].isVisited) {
      if (explore(neighbour, targetVertex, adjsList) === 1) {
        //if a path is found, early return 1
        return 1;
      }
    }
  }
  // once all neighbours has been explored, and no path is found return 0
  return 0;
};

main();
