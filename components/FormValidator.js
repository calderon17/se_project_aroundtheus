export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formEl;
  }
  // ------------------------------------------------------------------------------
  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  // ------------------------------------------------------------------------------

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  // ------------------------------------------------------------------------------

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(this._form, inputEl);
    }
    hideInputError(this._form, inputEl);
  }

  //------------------------------------------------------------------------------

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  // ------------------------------------------------------------------------------

  toggleButtonState(inputEls, submitButton) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disbled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disbled = false;
  }

  // ------------------------------------------------------------------------------

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        _checkInputValidity(this._form, inputEl);
        _toggleButtonState(this._inputEls, submitButton);
      });
    });
  }

  // ------------------------------------------------------------------------------

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
// ------------------------------------------------------------------------------

// const settings = {
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// const formEl = {
//   formSelector: ".modal__form",
// };

// //here is the initiation of both
// // const editFormValidator = new FormValidator(settings, formEl);

// // const addFormValidator = new FormValidator(settings, addForm);
// editFormValidator.enableValidation();
