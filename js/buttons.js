function StartVisualizer(rows, cols) {
    if (GetEndPos().length === 0) {
        //place target node
        return;
    } else if (GetStartPos().length === 0) {
        //place start node
        return;
    }
    if (running) {
        //running
        return;
    }
    if (needsReset) {
        //needs reset
        return;
    }
    if (creatingMaze) {
        //creating maze
        return;
    }
    if(resettingWalls) {
        //resetting walls
        return;
    }
    switch (selectedPathfinder) {
        case '':
            //Select path finder
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