import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._deleteCardModal = this._popupElement;
    this._formElement = this._deleteCardModal.querySelector(".modal__form");
  }

  setSubmitFunction(submitFunction) {
    this._submitFunction = submitFunction;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents the form from reloading the page or submitting normally
      if (this._submitFunction) {
        this._submitFunction(); // Calls the provided delete function
      }
    });
    super.setEventListeners(); // Calls the parent method to set up other event listeners
  }
}

///////////////////////////////////////////////

//   setEventListeners() {
//     this._deleteCardModal
//       .querySelector(".modal__form")
//       .addEventListener("submit", () => {
//         this._submitFunction();
//       });
//     super.setEventListeners();
//   }
// }

// export default PopupConfirmDelete;

//////////////////////////////////////////////////////////

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
