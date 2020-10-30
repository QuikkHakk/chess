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
        super(x, y, color, color + "Knight");
    }
}

class QueenPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Queen");
    }
}

class RookPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Rook");
    }
}

class BishopPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Bishop");
    }
}

class KnightPiece extends Piece {
    constructor(x, y, color) {
        super(x, y, color, color + "Knight");
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
        } else {
            if (!hastile(this.x, this.y + 1)) {
               moves.push({x: this.x, y: this.y + 1}); 
            }
            if (this.amount_moves == 0) {
                if (!hastile(this.x, this.y + 2)) {
                   moves.push({x: this.x, y: this.y + 2}); 
                }
            }
        }
        return moves;
    }
}
