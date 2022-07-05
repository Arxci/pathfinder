function RunAStar(openSet, closedSet, timer) {
    var lowestFValue = 0
    for (var i = 0; i < openSet.length; i++) {
        if ($(openSet[i]).data('f') < $(openSet[lowestFValue]).data('f')) {
            lowestFValue = i
        }
    }
    var current = openSet[lowestFValue];

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
            var tempG = ($(current).data('g') + 1);   
            if (tempG < $(neighbor).data('g')) {
                $(neighbor).data('g', tempG);
                neighborPos = neighbor.id.split(' ');
                $(neighbor).data('h', h(neighborPos[0], neighborPos[1], GetEndPos()[0], GetEndPos()[1]))
                $(neighbor).data('f', ($(neighbor).data('g') + $(neighbor).data('h')));
                $(neighbor).data('previous', current);

                if (!openSet.includes(neighbor)) {
                    $(neighbor).data('g', tempG);
                    openSet.push(neighbor);
                    neighbor.classList.toggle('open-node');
                }
            }
        } 
    }
}

function StartAStar() {
    openSet = [];
    closedSet = [];
    start = grid[GetStartPos()[0]][GetStartPos()[1]];
    end = grid[GetEndPos()[0]][GetEndPos()[1]];
    $(start).data('g', 0);
    $(start).data('f', h(GetStartPos()[0], GetStartPos()[1], GetEndPos()[0], GetEndPos()[1]));
    openSet.push(start);
    start.classList.toggle('open-node');
    var timer = setInterval(() => {
        RunAStar(openSet, closedSet, timer);
        if (openSet.length <= 0) {
            clearInterval(timer);
            currentPathfinderState = "needsReset";
        }
    }, 15);

}

function h(x1, x2, y1, y2) {
    return Math.abs(x1 - y1) + Math.abs(x2 - y2);
}