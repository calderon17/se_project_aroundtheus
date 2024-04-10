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

  _hideInputError() {}

  // ------------------------------------------------------------------------------

  _checkInputValidity(/*formEl,*/ inputEl /*options*/) {
    if (!inputEl.validity.valid) {
      return showInputError(formEl, inputEl, options);
    }
    hideInputError(formEl, inputEl, options);
  }

  //------------------------------------------------------------------------------

  _hasInvalidInput() {}

  // ------------------------------------------------------------------------------

  // i have to figure out
  //

  toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disbled = true;
      return;
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disbled = false;
  }
  // i have to figure out

  // ------------------------------------------------------------------------------

  _setEventListeners() {
    // const { this: _inputSelector } = options;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        _checkInputValidity(this._form, inputEl);
        _toggleButtonState(inputEls, submitButton);
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
