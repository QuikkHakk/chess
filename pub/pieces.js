class Piece {
    constructor(x, y, color, img_name) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.image = load_image(img_name);
        this.amount_moves = 0;
    }

    render() {
        ctx.drawImage(
            this.image,
            this.x * TILE_SIZE,
            this.y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );
    }

    possible_moves(board) {
        return [];
    }
}

class KingPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "King");
    }

    possible_moves(board) {
        let moves = [];

        if (this.amount_moves == 0) {
            if (!hastile(this.x - 1, this.y)
                && !hastile(this.x - 2, this.y)
                && !hastile(this.x - 3, this.y)
            ) {
                let t = gettile(this.x - 4, this.y);
                if (t != null 
                    && t.color == this.color
                    && t.amount_moves == 0
                    && t instanceof RookPiece) {
                    moves.push({x: this.x - 2, y: this.y});
                }
            } else if (!hastile(this.x + 1, this.y)
                && !hastile(this.x + 2, this.y)) {
                let t = gettile(this.x + 3, this.y);
                if (t != null 
                    && t.color == this.color
                    && t.amount_moves == 0
                    && t instanceof RookPiece) {
                    moves.push({x: this.x + 2, y: this.y});
                }
            }
        }

        if (this.x <= 6) {
            let t = gettile(this.x + 1, this.y);
            if (t == null) {
                moves.push({x: this.x + 1, y: this.y});
            } else if (t.color != this.color) {
                moves.push({x: this.x + 1, y: this.y});
            }
        }

        if (this.x <= 6 && this.y <= 6) {
            let t = gettile(this.x + 1, this.y + 1);
            if (t == null) {
                moves.push({x: this.x + 1, y: this.y + 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x + 1, y: this.y + 1});
            }
        }

        if (this.y <= 6) {
            let t = gettile(this.x, this.y + 1);
            if (t == null) {
                moves.push({x: this.x, y: this.y + 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x, y: this.y + 1});
            }
        }

        if (this.x > 0 && this.y <= 6) {
            let t = gettile(this.x - 1, this.y + 1);
            if (t == null) {
                moves.push({x: this.x - 1, y: this.y + 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x - 1, y: this.y + 1});
            }
        }

        if (this.x > 0) {
            let t = gettile(this.x - 1, this.y);
            if (t == null) {
                moves.push({x: this.x - 1, y: this.y});
            } else if (t.color != this.color) {
                moves.push({x: this.x - 1, y: this.y});
            }
        }

        if (this.x > 0 && this.y > 0) {
            let t = gettile(this.x - 1, this.y - 1);
            if (t == null) {
                moves.push({x: this.x - 1, y: this.y - 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x - 1, y: this.y - 1});
            }
        }

        if (this.y > 0) {
            let t = gettile(this.x, this.y - 1);
            if (t == null) {
                moves.push({x: this.x, y: this.y - 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x, y: this.y - 1});
            }
        }

        if (this.x <= 6 && this.y > 0) {
            let t = gettile(this.x + 1, this.y - 1);
            if (t == null) {
                moves.push({x: this.x + 1, y: this.y - 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x + 1, y: this.y - 1});
            }
        }
        return moves;    
    }
}

class QueenPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Queen");
    }

    possible_moves(board) {
        let moves = [];

        for (let x = this.x + 1; x < 8; x++) {
            let t = gettile(x, this.y);
            if (t == null) {
                moves.push({x: x, y: this.y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: this.y});
                }
                break;
            }
        }

        for (let x = this.x - 1; x >= 0; x--) {
            let t = gettile(x, this.y);
            if (t == null) {
                moves.push({x: x, y: this.y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: this.y});
                }
                break;
            }
        }

        for (let y = this.y + 1; y < 8; y++) {
            let t = gettile(this.x, y);
            if (t == null) {
                moves.push({x: this.x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: this.x, y: y});
                }
                break;
            }
        }

        for (let y = this.y - 1; y >= 0; y--) {
            let t = gettile(this.x, y);
            if (t == null) {
                moves.push({x: this.x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: this.x, y: y});
                }
                break;
            }
        }
        let x = this.x;
        let y = this.y;

        while (x < 7 && y < 7) {
            x++;
            y++;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: y});
                }
                break;
            }
        }

        x = this.x;
        y = this.y;

        while (x < 7 && y > 0) {
            x++;
            y--;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: y});
                }
                break;
            }
        }

        x = this.x;
        y = this.y;

        while (x > 0 && y > 0) {
            x--;
            y--;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: this.y});
                }
                break;
            }
        }

        x = this.x;
        y = this.y;

        while (x > 0 && y < 7) {
            x--;
            y++;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: y});
                }
                break;
            }
        }
        return moves;
    }
}

class RookPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Rook");
    }

    possible_moves(board) {
        let moves = [];

        for (let x = this.x + 1; x < 8; x++) {
            let t = gettile(x, this.y);
            if (t == null) {
                moves.push({x: x, y: this.y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: this.y});
                }
                break;
            }
        }

        for (let x = this.x - 1; x >= 0; x--) {
            let t = gettile(x, this.y);
            if (t == null) {
                moves.push({x: x, y: this.y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: this.y});
                }
                break;
            }
        }

        for (let y = this.y + 1; y < 8; y++) {
            let t = gettile(this.x, y);
            if (t == null) {
                moves.push({x: this.x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: this.x, y: y});
                }
                break;
            }
        }

        for (let y = this.y - 1; y >= 0; y--) {
            let t = gettile(this.x, y);
            if (t == null) {
                moves.push({x: this.x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: this.x, y: y});
                }
                break;
            }
        }
        return moves;
    }
}

class BishopPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Bishop");
    }

    possible_moves(board) {
        let moves = [];
        let x = this.x;
        let y = this.y;

        while (x < 7 && y < 7) {
            x++;
            y++;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: y});
                }
                break;
            }
        }

        x = this.x;
        y = this.y;

        while (x < 7 && y > 0) {
            x++;
            y--;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: y});
                }
                break;
            }
        }

        x = this.x;
        y = this.y;

        while (x > 0 && y > 0) {
            x--;
            y--;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: y});
                }
                break;
            }
        }

        x = this.x;
        y = this.y;

        while (x > 0 && y < 7) {
            x--;
            y++;
            let t = gettile(x, y);
            if (t == null) {
                moves.push({x: x, y: y});
            } else {
                if (t.color != this.color) {
                    moves.push({x: x, y: y});
                }
                break;
            }
        }
        return moves;
    }
}

class KnightPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Knight");
    }

    possible_moves(board) {
        let moves = [];

        if (this.x > 0 && this.y < 6) {
            let t = gettile(this.x - 1, this.y + 2);
            if (t == null) {
                moves.push({x: this.x - 1, y: this.y + 2});
            } else if (t.color != this.color) {
                moves.push({x: this.x - 1, y: this.y + 2});
            }
        }

        if (this.x > 0 && this.y > 1) {
            let t = gettile(this.x - 1, this.y - 2);
            if (t == null) {
                moves.push({x: this.x - 1, y: this.y - 2});
            } else if (t.color != this.color) {
                moves.push({x: this.x - 1, y: this.y - 2});
            }
        }

        if (this.x < 7 && this.y < 6) {
            let t = gettile(this.x + 1, this.y + 2);
            if (t == null) {
                moves.push({x: this.x + 1, y: this.y + 2});
            } else if (t.color != this.color) {
                moves.push({x: this.x + 1, y: this.y + 2});
            }
        }

        if (this.x < 7 && this.y > 1) {
            let t = gettile(this.x + 1, this.y - 2);
            if (t == null) {
                moves.push({x: this.x + 1, y: this.y - 2});
            } else if (t.color != this.color) {
                moves.push({x: this.x + 1, y: this.y - 2});
            }
        }

        if (this.x > 1 && this.y > 0) {
            let t = gettile(this.x - 2, this.y - 1);
            if (t == null) {
                moves.push({x: this.x - 2, y: this.y - 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x - 2, y: this.y - 1});
            }
        }

        if (this.x < 6 && this.y > 0) {
            let t = gettile(this.x + 2, this.y - 1);
            if (t == null) {
                moves.push({x: this.x + 2, y: this.y - 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x  + 2, y: this.y - 1});
            }
        }

        if (this.x > 1 && this.y < 7) {
            let t = gettile(this.x - 2, this.y + 1);
            if (t == null) {
                moves.push({x: this.x - 2, y: this.y + 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x - 2, y: this.y + 1});
            }
        }

        if (this.x < 6 && this.y < 7) {
            let t = gettile(this.x + 2, this.y + 1);
            if (t == null) {
                moves.push({x: this.x + 2, y: this.y + 1});
            } else if (t.color != this.color) {
                moves.push({x: this.x + 2, y: this.y + 1});
            }
        }

        return moves;
    }
}

class PawnPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Pawn");
    }
    
    possible_moves(board) {
        let moves = [];
        if (this.color == "White") {
            if (!hastile(this.x, this.y - 1)) {
               moves.push({x: this.x, y: this.y - 1}); 
            }
            if (this.amount_moves == 0) {
                if (!hastile(this.x, this.y - 2)) {
                   moves.push({x: this.x, y: this.y - 2}); 
                }
            }
            let tl = gettile(this.x - 1, this.y - 1);
            if (tl != null && isblack(tl)) {
                moves.push({x: tl.x, y: tl.y});
            }
            tl = gettile(this.x + 1, this.y - 1);
            if (tl != null && isblack(tl)) {
                moves.push({x: tl.x, y: tl.y});
            }
        } else {
            if (!hastile(this.x, this.y + 1)) {
               moves.push({x: this.x, y: this.y + 1}); 
            }
            if (this.amount_moves == 0) {
                if (!hastile(this.x, this.y + 2)) {
                   moves.push({x: this.x, y: this.y + 2}); 
                }
            }
            let tl = gettile(this.x - 1, this.y + 1);
            if (tl != null && iswhite(tl)) {
                moves.push({x: tl.x, y: tl.y});
            }
            tl = gettile(this.x + 1, this.y + 1);
            if (tl != null && iswhite(tl)) {
                moves.push({x: tl.x, y: tl.y});
            }
        }
        return moves;
    }
}
