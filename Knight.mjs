//square represents a location on the 8x8 board, and all possible movements
//directly from this position
const Square = function (pos, down2left1=null, down2right1=null, down1left2=null, down1right2=null, up1left2=null, up1right2=null, up2left1=null, up2right1=null) {
    const neighbors = function () {
        return [this.down2left1, this.down2right1, this.down1left2,this.down1right2, this.up1left2, this.up1right2, this.up2left1, this.up2right1]
    }
    return{pos, neighbors, down2left1, down2right1, down1left2, down1right2, up1left2, up1right2, up2left1, up2right1}
}

const Knight = function (square) {
    const loc = function () {
        return square.pos;
    }
    return {square, loc}
}

const onBoard = function(pos) {
    return (pos[0] >= 0 && pos[0] < 8) && (pos[1] >= 0 && pos[1] < 8)
}

const reverse = function(s) {
    if(s.charAt(0) === 'u') {
        return s.length > 8? 'down' + s.charAt(2) + 'left' + s.charAt(9) : 'down' + s.charAt(2) + 'right' + s.charAt(8);
    }
    else {
        return s.length > 10? 'up' + s.charAt(4) + 'left' + s.charAt(11) : 'up' + s.charAt(4) + 'right' + s.charAt(10);
    }
}

const squares = new Map();

const createSquare = function(pos) {
    if(!onBoard(pos)) {
        pos = [0, 0];
    }
    let square;
    if(squares.has(pos + "")) {
        return squares.get(pos+"");
    } 
    else {
        square = Square(pos);
        squares.set(pos + "", square);
    }
    let move;

    //down 2 left 1
    let arr = [pos[0] - 2, pos[1] - 1];
    if(onBoard(arr)) {
        move = [pos[0] - 2, pos[1] - 1]
        if(square.down2left1 === null) {
            square.down2left1 = createSquare(move);
        }
    }
    
    //down 2 right 1
    arr = [pos[0] - 2, pos[1] + 1];
    if(onBoard(arr)) {
        move = [pos[0] - 2, pos[1] + 1]
        if(square.down2right1 === null) {
            square.down2right1 = createSquare(move);
        }
    }
    
    //down 1 left 2
    arr = [pos[0] - 1, pos[1] - 2]
    if(onBoard(arr)) {
        move = [pos[0] - 1, pos[1] - 2]
        if(square.down1left2 === null) {
            square.down1left2 = createSquare(move);
        }
    }
    
    //down 1 right 2
    arr = [pos[0] - 1, pos[1] + 2]
    if(onBoard(arr)) {
        move = [pos[0] - 1, pos[1] + 2]
        if(square.down1right2 === null) {
            square.down1right2 = createSquare(move);
        }
    }
    
    //up 1 left 2
    arr = [pos[0] + 1, pos[1] - 2]
    if(onBoard(arr)) {
        move = [pos[0] + 1, pos[1] - 2]
        if(square.up1left2 === null) {
            square.up1left2 = createSquare(move);
        }
    }

    //up 1 right 2
    arr = [pos[0] + 1, pos[1] + 2]
    if(onBoard(arr)) {
        move = [pos[0] + 1, pos[1] + 2]
        if(square.up1right2 === null) {
            square.up1right2 = createSquare(move);
        }
    }
    
    //up 2 left 1
    arr = [pos[0] + 2, pos[1] - 1]
    if(onBoard(arr)) {
        move = [pos[0] + 2, pos[1] - 1]
        if(square.up2left1 === null) {
            square.up2left1 = createSquare(move);
        }
    }

    //up 2 right 1
    arr = [pos[0] + 2, pos[1] + 1]
    if(onBoard(arr)) {
        move = [pos[0] + 2, pos[1] + 1]
        if(square.up2right1 === null) {
            square.up2right1 = createSquare(move);
        }
    }
    return square;
    
}



const bfs = function (pos1, pos2) {
    let origin = createSquare(pos1);
    let visited = new Set();
    let previous = new Map();

    let arr = [];
    let Q = [origin];
    let dQ;
    while(Q.length > 0) {
        dQ = Q.shift();
        
        if(dQ !== null && !visited.has(dQ.pos+"")) {
            arr.push(dQ.pos+"");
            if(dQ.pos+"" === pos2+"") {
                break;
            }
            Q.push(...dQ.neighbors());

            dQ.neighbors().forEach(node => {
                if(node !== null && dQ !== null && !visited.has(node.pos+"")) {
                    previous.set(node.pos+"", dQ.pos+"");
                }
            })
            visited.add(dQ.pos + "");

        }
    }
    return {previous, arr};
}

const knightMoves = function(pos1, pos2) {
    let search = bfs(pos1, pos2);
    let previous = search.previous;
    let prev = pos2+"";
    let path = [];
    while(previous.has(prev)) {
        path.unshift(previous.get(prev));
        prev = previous.get(prev)
    }
    path.push(pos2+"");
    let shortestPath = [];
    for(let i = 0; i < path.length; i++) {
        shortestPath.push([parseInt(path[i].charAt(0)), parseInt(path[i].charAt(2))])
    }
    let steps = path.length - 1;
    return {shortestPath, steps};

}



const pathTeller = function(pos1, pos2) {
    let path = knightMoves(pos1, pos2);

    console.log('You made it in ' + path.steps + ' moves! Here\'s your path:' )
    path.shortestPath.forEach((coord) => {
        console.log(coord);
});
}

export {pathTeller};
