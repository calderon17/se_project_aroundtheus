import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.queryselector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popupForm.queryselector(".modal__input")
    );
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super.setEventListeners;
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  open() {
    super.open();
    this._button.textcontent = "Save";
  }
}

export default PopupWithForm;
