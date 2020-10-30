const WHITE_KING = 1;
const BLACK_KING = 2;
const WHITE_QUEEN = 3;
const BLACK_QUEEN = 4;
const WHITE_BISHOP = 5;
const BLACK_BISHOP = 6;
const WHITE_KNIGHT = 7;
const BLACK_KNIGHT = 8;
const WHITE_ROOK = 9;
const BLACK_ROOK = 10;
const WHITE_PAWN = 11;
const BLACK_PAWN = 12;

const COLOR_WHITE = 1;
const COLOR_BLACK = 2;

const BOARD_SIZE = 800;
const TILE_SIZE = BOARD_SIZE / 8;

const socket = io();
let board = [];
let is_player = false;
let my_move = false;
let my_color;

let selected = false;
let selected_pos = {x: 0, y: 0};

window.onload = function() {
    status_p = document.getElementById("status");
    move_p = document.getElementById("move");
    canv = document.getElementById("canv_board");
    canv.addEventListener("mouseup", left_click);
    canv.width = BOARD_SIZE;
    canv.height = BOARD_SIZE;

    ctx = canv.getContext("2d");

    init_game();
    setInterval(loop, 1000 / 60);
}

function init_game() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            board.push(null);
        }
    }
}

function loop() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if ((x + y) % 2 == 0) {
                let sp = selected_pos;
                if (selected && sp.x == x && sp.y == y) {
                    ctx.fillStyle = "#F6F669";
                } else {
                    ctx.fillStyle = "#EEEED2";
                }
            } else {
                let sp = selected_pos;
                if (selected && sp.x == x && sp.y == y) {
                    ctx.fillStyle = "#BACA2B";
                } else {
                    ctx.fillStyle = "#769656";
                }
            }
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);            
            let tile_at = gettile(x, y);
            if (tile_at != null) {
                tile_at.render();
            }
        }
    }
}


function gettile(x, y) {
    return board[x + y * 8];
}

function hastile(x, y) {
    return gettile(x, y) != null;
}

function iswhite(t) {
    return t.color == "White";
}

function isblack(t) {
    return t.color == "Black";
}

function is_my_color(t) {
    return (iswhite(t) && my_color == COLOR_WHITE)
        || (isblack(t) && my_color == COLOR_BLACK);
}

function left_click(e) {
    if (!my_move) {
        return;
    }
    tile_x = Math.floor(e.clientX / TILE_SIZE);
    tile_y = Math.floor(e.clientY / TILE_SIZE);
    if (tile_x < 8 && tile_y < 8) {
        let t = gettile(tile_x, tile_y);
        if (hastile(tile_x, tile_y) && is_my_color(t)) {
            selected = true;
            selected_pos = {x: tile_x, y: tile_y};
        }
    }
}

socket.on("update-board", (data) => {
    board = [];
    for (let i = 0; i < data.board.length; i++) {
        let p = data.board[i];
        let x = i % 8;
        let y = Math.floor(i / 8);
        let color = (p % 2 == 1) ? "White" : "Black";
        if (p == 0) {
            board.push(null);
        } else if (p == WHITE_KING) {
            board.push(new KingPiece(x, y, color));
        } else if (p == BLACK_KING) {
            board.push(new KingPiece(x, y, color));
        } else if (p == WHITE_QUEEN) {
            board.push(new QueenPiece(x, y, color));
        } else if (p == BLACK_QUEEN) {
            board.push(new QueenPiece(x, y, color));
        } else if (p == WHITE_ROOK) {
            board.push(new RookPiece(x, y, color));
        } else if (p == BLACK_ROOK) {
            board.push(new RookPiece(x, y, color));
        } else if (p == WHITE_BISHOP) {
            board.push(new BishopPiece(x, y, color));
        } else if (p == BLACK_BISHOP) {
            board.push(new BishopPiece(x, y, color));
        } else if (p == WHITE_KNIGHT) {
            board.push(new KnightPiece(x, y, color));
        } else if (p == BLACK_KNIGHT) {
            board.push(new KnightPiece(x, y, color));
        } else if (p == WHITE_PAWN) {
            board.push(new PawnPiece(x, y, color));
        } else if (p == BLACK_PAWN) {
            board.push(new PawnPiece(x, y, color));
        }
    }
});

socket.on("set-color", (color) => {
    if (color == "white" || color == "black") {
        if (color == "white") {
            my_color = COLOR_WHITE;
        } else {
            my_color = COLOR_BLACK;
        }
        status_p.innerText = color;
        is_player = true;
    } else {
        status_p.innerText = "In queue";
        is_player = false;
    }
});

socket.on("set-move", (b) => {
    my_move = b;
    if (my_move) {
        move_p.innerText = "Your Move";
    } else {
        move_p.innerText = "Opponent's Move";
    }
});

function load_image(name) {
    let image = new Image();
    image.src = "/rsc/" + name + ".png";
    return image;
}
