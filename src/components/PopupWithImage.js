import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__img");
  }
  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
export default PopupWithImage;
