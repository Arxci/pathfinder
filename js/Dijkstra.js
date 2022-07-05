function RunDijkstra(openSet, closedSet, timer) {
    current = openSet[0];

    if (current === end) {
        ReBuildPath(current, timer);
    }

    RemoveFromArray(openSet, current);
    closedSet.push(current);
    current.classList.toggle('closed-node');
    current.classList.toggle('open-node');
    var neighbors = $(current).data('neighbors');
    for (neighbor of neighbors) {
        if (!closedSet.includes(neighbor)) {
            $(neighbor).data('previous', current);

            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
                neighbor.classList.toggle('open-node');
            }
        }
    }
}

function StartDijkstra() {
    openSet = [];
    closedSet = [];
    start = grid[GetStartPos()[0]][GetStartPos()[1]];
    end = grid[GetEndPos()[0]][GetEndPos()[1]];
    openSet.push(start);
    start.classList.toggle('open-node');
    var timer = setInterval(() => {
        RunDijkstra(openSet, closedSet, timer);
        if (openSet.length <= 0) {
            clearInterval(timer);
            currentPathfinderState = "needsReset";
        }
    }, 15)
}