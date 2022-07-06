function StartVisualizer(rows, cols) {
    if (GetEndPos().length === 0) {
        StartError('Failed to run. Place target node to run.');
        return;
    } else if (GetStartPos().length === 0) {
        StartError('Failed to run. Place start node to run.');
        return;
    }
    if (running) {
        StartError('Failed to run. Already running.');
        return;
    }
    if (needsReset) {
        StartError('Failed to run. Needs Reset.');
        return;
    }
    if (creatingMaze) {
        StartError('Failed to run. Creating maze.');
        return;
    }
    if(resettingWalls) {
        StartError('Failed to run. Resetting walls.');
        return;
    }
    switch (selectedPathfinder) {
        case '':
            StartError('Failed to run. Select pathfinder.');
            break;
        case 'AStar':
            currentPathfinderState = "running";
            for (var i = 0; i < rows; i++) {
                for(var j = 0; j < cols; j++) {
                    UpdateNeighbors(i, j)
                }
            }
            StartAStar();
            break;
        case 'Dijkstra':
            currentPathfinderState = "running";
            for (var i = 0; i < rows; i++) {
                for(var j = 0; j < cols; j++) {
                    UpdateNeighbors(i, j)
                }
            }
            StartDijkstra();
            break;
    }
}

function ToggleDropdown () {
    dropdown.classList.toggle('active');

    for (let item of dropdownItems) {
        item.classList.toggle('active');
    }

}

function SelectPathfinder(e) {
    if (e.target.className === "A*") {
        selectedPathfinder = 'AStar';
    } else {
        selectedPathfinder = 'Dijkstra';
    }
    ToggleDropdown();
}

window.addEventListener('mousedown', (e) => HandleWallPlacement(e));
start.addEventListener('click', () => StartVisualizer(rows, cols)); 
resetNodes.addEventListener('click', ResetNodes);
resetWalls.addEventListener('click', ResetWalls);
window.addEventListener('mousedown', (e) => HandleStartNodePlacement(e));
window.addEventListener('mousedown', (e) => HandleTargetNodePlacement(e));
//createMaze.addEventListener('click', CreateMaze);
dropdown.addEventListener('click', () => ToggleDropdown());
for (let item of dropdownItems) {
    item.addEventListener('click', (e) => SelectPathfinder(e));
}