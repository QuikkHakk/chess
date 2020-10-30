const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

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

let player_white;
let player_black;

let board = [];
let queue = [];
let playing = false;

app.use(express.static("pub"));
reset_game();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
});

io.on("connection", (socket) => {
    queue_add(socket);
    console.log("queue: " + queue.length);

    if (!playing && queue.length >= 2) {
        if (Math.round(Math.random()) == 1) {
            set_white(queue.shift());
            set_black(queue.shift())
        } else {
            set_black(queue.shift())
            set_white(queue.shift());
        }
        start_game();
    }
    
    socket.on('disconnect', () => {
        queue.splice(queue.indexOf(socket), 1);
        console.log("queue: " + queue.length);
        if (socket == player_white) {
            if (queue.length > 0) {
                set_white(player_black);
                set_black(queue.shift())
                start_game();
            } else {
                queue_add(player_black);
                reset_game();
                playing = false;
            }
        } else if (socket == player_black) {
            if (queue.length > 0) {
                set_black(player_white);
                set_white(queue.shift());
                start_game();
            } else {
                queue_add(player_white);
                reset_game();
                playing = false;
            }
        }
    });
});

function queue_add(player) {
    queue.push(player);
    player.emit("set-color", "");
}

function set_white(s) {
    player_white = s; 
    s.emit("set-color", "white");
}
function set_black(s) {
    player_black = s; 
    s.emit("set-color", "black");
}

function send_board() {
    io.emit("update-board", {board: board});
}

function start_game() {
    playing = true;
    reset_game();
    player_white.emit("set-move", true);
    player_black.emit("set-move", false);
}

function reset_game() {
    board = [];
    board.push(BLACK_ROOK);
    board.push(BLACK_KNIGHT);
    board.push(BLACK_BISHOP);
    board.push(BLACK_QUEEN);
    board.push(BLACK_KING);
    board.push(BLACK_BISHOP);
    board.push(BLACK_KNIGHT);
    board.push(BLACK_ROOK);
    for (let i = 0; i < 8; i++) {
        board.push(BLACK_PAWN);
    }
    for (let i = 0; i < 8 * 4; i++) {
        board.push(0);
    }
    for (let i = 0; i < 8; i++) {
        board.push(WHITE_PAWN);
    }
    board.push(WHITE_ROOK);
    board.push(WHITE_KNIGHT);
    board.push(WHITE_BISHOP);
    board.push(WHITE_QUEEN);
    board.push(WHITE_KING);
    board.push(WHITE_BISHOP);
    board.push(WHITE_KNIGHT);
    board.push(WHITE_ROOK);
    send_board();
}

http.listen(4422, () => {
  console.log("Starting server!");
});
