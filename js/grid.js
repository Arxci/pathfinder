function MakeGrid(rows, cols) {
    grid = [];
    const container = document.querySelector('.pathfinder__box');

    for (var i = 0; i < rows; i++) {
        grid.push([]);
        for (var j = 0; j < cols; j++) {
            const item = document.createElement('div');
            grid[i].push(item);
            item.classList.toggle('grid-item')
            item.setAttribute('id', i + ' ' + j);
            $(item).data('f', Infinity);
            $(item).data('h', 0);
            $(item).data('g', Infinity);
            $(item).data('neighbors', 0);
            $(item).data('previous', 0);
            item.addEventListener('mouseover', (e) => HandleWallPlacement(e));
            container.appendChild(grid[i][j]);
        }
    }
}

function HandleWallPlacement(e) {
    if (e.shiftKey && (e.target.className === 'grid-item' || e.target.className === 'grid-item wall') && e.buttons) {
        if (!running && !needsReset) { //Not running
            if (!creatingMaze) { //Not creaing maze
                if (!resettingWalls) { //Not resetting walls
                    e.target.classList.toggle('wall');
                } else {
                    //Resetting Walls
                }
            } else {
                //Maze being made
            }
        } else {
            //Running
        }
    }
}

function IsWall(gridItem) {
    return gridItem.className === 'grid-item wall'
}

function HandleStartNodePlacement(e) {
    if (e.buttons && e.target.className === 'grid-item' && !e.shiftKey && !e.ctrlKey) {
        if (!running && !needsReset) {
            if (!creatingMaze) {
                const start = document.getElementsByClassName('start');
                if (start[0]) {
                    start[0].parentElement.removeChild(start[0]);
                }
                const item = document.createElement('i');
                item.classList.toggle('fa-solid');
                item.classList.toggle('fa-arrow-right');
                item.classList.toggle('start');
                e.target.appendChild(item);
            } else {
                //Maze being made
            }
        } else {
            //Running
        }
    }
}

function HandleTargetNodePlacement(e) {
    if (e.ctrlKey && e.buttons && e.target.className === 'grid-item') {
        if (!running && !needsReset) {
            if (!creatingMaze) {
                const target = document.getElementsByClassName('target');
                if (target[0]) {
                    target[0].parentElement.removeChild(target[0]);
                }
                const item = document.createElement('i');
                item.classList.toggle('fa-solid');
                item.classList.toggle('fa-bullseye');
                item.classList.toggle('target');
                e.target.appendChild(item);
            } else {
                //Creating Maze
            }
        } else {
            //Running
        }
    }
}

function GetStartPos() {
    pos = [];
    for(var i = 0; i < rows; i++ ) {
        for(var j = 0; j < cols; j++) {
            const temp = grid[i][j];
            if (temp.childNodes[0]) {
                if (temp.childNodes[0].className == 'fa-solid fa-arrow-right start') {
                    pos = [i, j];
                    break;
                }
            }
        }
    }
    return pos;
}

function GetEndPos() {
    pos = [];
    for(var i = 0; i < rows; i++ ) {
        for(var j = 0; j < cols; j++) {
            const temp = grid[i][j];
            if (temp.childNodes[0]) {
                if (temp.childNodes[0].className == 'fa-solid fa-bullseye target') {
                    pos = [i, j];
                    break;
                }
            }
        }
    }
    return pos;
}

function ResetNodes() {
    if (!running) {
        var nodes = document.getElementsByClassName('grid-item open-node');
        var node;
        var timer;
        currentPathfinderState = "needsReset";
        if (document.getElementsByClassName('grid-item open-node').length > 0 || document.getElementsByClassName('grid-item best-path').length > 0 || document.getElementsByClassName('grid-item closed-node').length > 0) {
            timer = setInterval(() => {
                if (document.getElementsByClassName('grid-item best-path').length == 0 && document.getElementsByClassName('grid-item closed-node').length == 0 && document.getElementsByClassName('grid-item open-node').length == 0) {
                    clearInterval(timer);
                    currentPathfinderState = "null";
                } else if (document.getElementsByClassName('grid-item closed-node').length == 0 && document.getElementsByClassName('grid-item open-node').length == 0) {
                    nodes = document.getElementsByClassName('grid-item best-path');
                    node = nodes[0];
                    node.classList.remove('best-path');
                } else if (document.getElementsByClassName('grid-item open-node').length == 0) {
                    nodes = document.getElementsByClassName('grid-item closed-node');
                    node = nodes[0];
                    node.classList.remove('closed-node');
                } else {
                    node = nodes[0];
                    node.classList.remove('open-node');
                }
                if (node) {
                    $(node).data('f', Infinity);
                    $(node).data('h', 0);
                    $(node).data('g', Infinity);
                    $(node).data('neighbors', 0);
                    $(node).data('previous', 0);
                }  
            }, 5)
        } else {
            clearInterval(timer);
            currentPathfinderState = "null";
        }
    } else {
        //Running
    }
}

function ResetWalls() {
    if (!running) {
        if (!creatingMaze) {
            var timer;
            currentPathfinderState = "resettingsWalls";
            const nodes = document.getElementsByClassName('grid-item wall');
            if (nodes.length > 0) {
                timer = setInterval(() => {
                    node = nodes[0];
                    node.classList.remove('wall');
                    if (nodes.length === 0) {
                        clearInterval(timer);
                        currentPathfinderState = "null";
                    }
                }, 5)
            } else {
                clearInterval(timer);
                currentPathfinderState = "null";
            }
        } else {
            //Creating maze
        }
    } else {
        //Running
    }
}

function RemoveFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}

function ReBuildPath(current, timer) {
    clearInterval(timer);
    path = [];
    var temp = current;
    path.push(temp);
    var t;
    if ($(temp).data('previous') != undefined) {
        t = setInterval(() => {
            temp.classList.toggle('closed-node');
            temp.classList.toggle('best-path');
            path.push($(temp).data('previous'));
            temp = $(temp).data('previous');
            if ($(temp).data('previous') == undefined) {
                clearInterval(t);
                currentPathfinderState = "needsReset";
            }
        }, 25);
    } 
}

function UpdateNeighbors(i, j) {
    const gridItem = grid[i][j];
    var neighbors = [];
    if (i - 1 >= 0) { //same column, one row down
        if (!IsWall(grid[i - 1][j]))
        {
            neighbors.push(grid[i - 1][j]);
        }
    }
    if (i + 1 < grid.length) { //same column, one row up
        if (!IsWall(grid[i + 1][j])) {
            neighbors.push(grid[i + 1][j]);
        }
    }
    if (j + 1 < grid[i].length) { //same row, one column to the right
        if (!IsWall(grid[i][j + 1])) {
            neighbors.push(grid[i][j + 1]);
        }
    }
    if (j - 1 >= 0) { //same row, one column to the left
        if (!IsWall(grid[i][j - 1])) {
            neighbors.push(grid[i][j - 1]);
        }
    }
    $(gridItem).data('neighbors', neighbors);
}