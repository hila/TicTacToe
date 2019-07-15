import Board from './Board';

const ICON_TYPE = {
    ICON_TYPE_X: "X",
    ICON_TYPE_O: "O"
}

const NUM_COLUMNS = 3;
const NUM_ROWS = 3;

/**
 * This class implements the game's manager
 */
class GameManager {

    constructor() {
        this.board = new Board(this.onClick.bind(this), this.reset.bind(this));
    
        //Set initial type X
        this.changeTurn();

        //Counter to monitor the steps left
        this.stepsCounter = 0;
    }

    /**
     * Click handler
     * @param {Tile} tile - the tile that was clicked
     */
    onClick(tile) {
        this.stepsCounter++;

        tile.setIconType(this.currentType);

        let winTypes = this.board.checkWinning(tile.getRow(), tile.getColumn());

        if (winTypes.length == 0) {
            if (this.stepsCounter == NUM_COLUMNS * NUM_ROWS) {
                this.board.showPopup("No more <br>moves, <br>It's a tie!");
            }
            else {
                this.changeTurn();
            }
        }
        else {
            this.board.displayWinnings(winTypes, tile.getRow(), tile.getColumn());
        }
    }

    /**
     * Update the current icon type to be played
     */
    changeTurn() {
        switch(this.currentType) {
            case ICON_TYPE.ICON_TYPE_X: {
                this.currentType = ICON_TYPE.ICON_TYPE_O;
                break;
            }
            default:
            case ICON_TYPE.ICON_TYPE_O: {
                 this.currentType = ICON_TYPE.ICON_TYPE_X;
                 break;
            }
        }

        //Update the instructions
        this.board.updateTitle("Player " + this.currentType + " please play your turn!");
    }

    /**
     * Resets the game
     */
    reset() {
        this.stepsCounter = 0;
        this.board.reset();
    }
}

export default GameManager;