class Piece {
    constructor(x, y, color, img_name) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.image = load_image(img_name);
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
}
