import Popup from "./Popup.js";

class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._deleteCardModal = this._popupElement;
  }

  setSubmitFunction(submitFunction) {
    this._submitFunction = submitFunction;
  }

  _setEventListeners() {
    this._deleteCardModal
      .querySelector(".modal__form")
      .addEventListener("submit", () => {
        this._submitFunction();
      });
    super.setEventListeners();
  }
}

export default PopupConfirmDelete;

// import Popup from "./Popup.js";

// class PopupConfirmDelete extends Popup {
//   constructor(PopupSelector) {
//     super({ PopupSelector });
//     this._deleteCardModal = this._popupElement;
//   }
//   _setEventListeners() {
//     this._deleteCard.addEventListener("click");
//     super.setEventListeners();
//   }
// }

// export default PopupConfirmDelete;
