import Tile from './Tile';
import Popup from './Popup';
import './../styles/board.css';

const WIN_TYPE = {
    WIN_TYPE_ROW:           0,
    WIN_TYPE_COLUMN:        1,
    WIN_TYPE_MAIN_DIAGONAL: 2,
    WIN_TYPE_ANTI_DIAGONAL: 3
}

const NUM_COLUMNS = 3;
const NUM_ROWS = 3;

/**
 * This class will be the game's manager
 */
class Board {

    constructor(onClickCallback, resetCallback) {
        let gameContainer = document.getElementById("gameContainer");
    
        let boardContainer = document.createElement("div");
        boardContainer.id = "boardContainer";
        gameContainer.appendChild(boardContainer);

        this.title = document.getElementById("title");
    
        //Crete 2D tiles array and create the tiles
        this.tiles = [[], [], []];
        this.createTiles();

        //Add start over button
        let startOverButton = document.createElement("button");
        gameContainer.appendChild(startOverButton);
        startOverButton.className = "startOverButton";
        startOverButton.onclick = resetCallback;
        startOverButton.innerHTML = "Start Over";

        //Initialize the game popup
        this.popup = new Popup();

        //A callback to handle clicks on the tiles
        this.onClickCallback = onClickCallback;
    }

    /**
     * Crete all the 9 tiles 
     * inside 3 divs of columns
     */
    createTiles() {
        for (let j = 0; j < NUM_COLUMNS; j++){
            let column = document.createElement("div");
            column.className = "col";
            boardContainer.appendChild(column);
            
            for (let i = 0; i < NUM_ROWS; i++) {
                this.tiles[i][j] = new Tile(i, j);
                this.tiles[i][j].setClickHandler((tile)=>{
                    this.title.className = "";

                    this.onClickCallback(tile);
                });
                column.appendChild(this.tiles[i][j].getView());
            }
        }
    }

    /**
     * Update the instructions title
     * @param {String} newTitle 
     */
    updateTitle(newTitle) {
        this.title.innerHTML  = newTitle;
        this.title.className += " titleChanged";
    }

    /**
     * Shows the relevant popup
     * @param {String} message 
     * @param {boolean} isWinningPopup 
     */
    showPopup(message, isWinningPopup) {
        this.popup.show(message, isWinningPopup);
    }

    /**
     * Check if after the move on row/column we have winning 
     * lines/columns/diagonal 
     * @return an array of winning types
     * @param {int} row 
     * @param {int} column 
     */
    checkWinning(row, column) {
        let winTypes = [];

        let type = this.tiles[row][column].getIconType();
        let counter = 0;
        //Check win in the row
        for (let j = 0; j < NUM_COLUMNS; j++) {
            if (this.tiles[row][j].getIconType() && this.tiles[row][j].getIconType() === type) {
                counter++;
            }
        }

        if (counter === NUM_COLUMNS) {
            winTypes.push(WIN_TYPE.WIN_TYPE_ROW);
        }

        //Check win in the column
        counter = 0;
        for (let i = 0; i < NUM_ROWS; i++) {
            if (this.tiles[i][column].getIconType() && this.tiles[i][column].getIconType() === type) {
                counter++;
            }
        }

        if (counter === NUM_ROWS) {
             winTypes.push(WIN_TYPE.WIN_TYPE_COLUMN);
        }

        //Check win in the main diagonal
        if (row == column) { 
            counter = 0;
            for (let i = 0, j=0; i < NUM_ROWS && j < NUM_COLUMNS; i++, j++) {
                if (this.tiles[i][j].getIconType() && this.tiles[i][j].getIconType() === type) {
                    counter++;
                }
            }

            if (counter === NUM_ROWS) {
                winTypes.push(WIN_TYPE.WIN_TYPE_MAIN_DIAGONAL);
            }
        }

        //Check win in the anti diagonal
        if (row + column == NUM_ROWS - 1) { 
            counter = 0;
            for (let i = (NUM_ROWS - 1), j = 0; i >= 0 && j < NUM_COLUMNS; i--, j++) {
                if (this.tiles[i][j].getIconType() && this.tiles[i][j].getIconType() === type) {
                    counter++;
                }
            }

            if (counter === NUM_ROWS) {
                winTypes.push(WIN_TYPE.WIN_TYPE_ANTI_DIAGONAL);
            }
        }

        //No winnings founds
        return winTypes;
    }

    /**
     * Display winnings
     * @param {*} winTypes - array of all the relevant winning types
     * @param {*} row - relevant row
     * @param {*} column - relevant column
     */
    displayWinnings(winTypes, row, column) {
        winTypes.forEach(winType => {
            switch(winType) {
                case WIN_TYPE.WIN_TYPE_ROW: {
                    for(let j = 0; j < NUM_COLUMNS; j++) {
                        this.tiles[row][j].showWin();
                    }
                    break;
                }
                case WIN_TYPE.WIN_TYPE_COLUMN: {
                    for(let i = 0; i < NUM_ROWS; i++) {
                        this.tiles[i][column].showWin();
                    }
                    break;
                }
                case WIN_TYPE.WIN_TYPE_MAIN_DIAGONAL: {
                    for(let i = 0; i < NUM_ROWS; i++) {
                        this.tiles[i][i].showWin();
                    }
                    break;
                }
                case WIN_TYPE.WIN_TYPE_ANTI_DIAGONAL: {
                    for(let i = (NUM_ROWS -1), j = 0; i >= 0 && j < NUM_COLUMNS; i--, j++) {
                        this.tiles[i][j].showWin();
                    }
                    break;
                }
            }

            this.tiles.forEach(row => {
                row.forEach(tile => {
                    tile.setDisabled(true);
                })
            });
        });

        //Display a win popup
        this.showPopup("Player " + this.tiles[row][column].getIconType() + "<br> you won!", true);
    }

    /**
     * Resets the board's elements
     */
    reset() {
        this.tiles.forEach(row => {
            row.forEach(tile => {
                tile.reset();
            })
        });

        this.popup.dismiss();
    }
}

export default Board;