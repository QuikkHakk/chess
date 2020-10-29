const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

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
        start_game();
        if (Math.round(Math.random()) == 1) {
            set_white(queue.shift());
            set_black(queue.shift())
        } else {
            set_black(queue.shift())
            set_white(queue.shift());
        }
    }
    
    socket.on('disconnect', () => {
        queue.splice(queue.indexOf(socket), 1);
        console.log("queue: " + queue.length);
        if (socket == player_white) {
            reset_game();
            if (queue.length > 0) {
                set_white(player_black);
                set_black(queue.shift())
                playing = true;
            } else {
                queue_add(player_black);
                playing = false;
            }
        } else if (socket == player_black) {
            reset_game();
            if (queue.length > 0) {
                set_black(player_white);
                set_white(queue.shift());
                playing = true;
            } else {
                queue_add(player_white);
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
}

function reset_game() {
    board = [];
    for (let i = 0; i < 8 * 8; i++) {
        board.push(0);
    }
    send_board();
}

http.listen(4422, () => {
  console.log("Starting server!");
});
