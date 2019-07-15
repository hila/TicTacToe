import './../styles/popup.css';

class Popup {
    constructor() {
        this.container = document.createElement("div");
        this.container.className = "popup";

        this.popupText = document.createElement("p");
        this.popupText.className = "popupText";
        this.container.appendChild(this.popupText);
    }

    show(message, isWin) {
        document.getElementById("gameContainer").appendChild(this.container);
        this.popupText.innerHTML = message;

        if(isWin) {
            this.container.className += " winPopup";

            //Auto dismiss after 1.5(delay) + 1(duration) + 1 seconds 
            setTimeout(() => this.dismiss(), 4000); 
        }
        else {
            //It's a tie we do not dismiss the popup until the playrs resets the game
            this.container.className += " tiePopup";
        }
    }

    dismiss() {
        this.container.className = "popup";
        if (this.container.parentNode == document.getElementById("gameContainer")) {
            document.getElementById("gameContainer").removeChild(this.container);
        }
    }
}

export default Popup