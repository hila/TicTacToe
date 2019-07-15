import './../styles/tile.css';
/**
 * Class represntation for a square on the board 
 */
class Tile {

    constructor(row, column) {
        this.tileContainer = document.createElement("button");
        this.tileContainer.className = "tile";
        this.row = row;
        this.column = column;

        //Crete an image for the selected icon
        this.tileIconImage = document.createElement("div");
        this.tileIconImage.className = "iconImage";
        this.tileContainer.appendChild(this.tileIconImage);
    }

    setClickHandler(callback) {
        this.tileContainer.onclick = ()=> {
            callback(this);
        }
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }

    /**
     * Sets the icon type to be either X or O
     * @param {ICON_TYPE} iconType 
     */
    setIconType(iconType) {
        this.iconType = iconType;
        this.tileIconImage.className += " " + iconType;
        this.setDisabled(true);
    }

    getIconType() {
        return this.iconType;
    }

    /**
     * @returns a conatainer view that holds all the tile's elements
     */
    getView() {
        return this.tileContainer;
    }

    /**
     * Trigger win animation
     */
    showWin() {
        this.tileContainer.className += " winTile";
        this.tileIconImage.className += " iconWin";
    }

    setDisabled(isDisabled) {
        this.tileContainer.disabled = isDisabled;
    }

    reset() {
        this.tileIconImage.className = "iconImage";
        this.tileContainer.className = "tile";
        this.iconType = null;
        this.setDisabled(false);
    }
}

export default Tile;