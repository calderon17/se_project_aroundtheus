import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.queryselector(".modal__caption").textcontent = name;
    const image = this._popupElement.queryselector("#preview-image-modal");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
export default PopupWithImage;
