import Popup from "./Popup.js";

class PopupConfirmDelete extends Popup {
  constructor(PopupSelector) {
    super({ PopupSelector });
    this._deleteCardModal = deleteCardModal;
  }
  _setEventListeners() {
    this._deleteCard.addEventListener("click");
  }
}

export default PopupConfirmDelete;
