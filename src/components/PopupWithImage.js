import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupElement.querySelector(".modal__caption").textcontent = name;
    this._image = this._popupElement.querySelector(".modal__img");
  }
  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;

    super.open();
  }
}
export default PopupWithImage;

// import Popup from "./Popup.js";

// class PopupWithImage extends Popup {
//   constructor(popupSelector) {
//     super({ popupSelector });
//     this._popupElement.querySelector(".modal__caption").textcontent = name;
//     const image = this._popupElement.querySelector("#preview-image-modal");
//   }
//   open({ link, name }) {
//     image.src = link;
//     image.alt = name;
//     super.open();
//   }
// }
// export default PopupWithImage;
