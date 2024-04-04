export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this.form = formEl;
  }
  // ------------------------------------------------------------------------------
  _showInputError() {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }
  // ------------------------------------------------------------------------------

  _hideInputError() {}

  // ------------------------------------------------------------------------------

  _checkInputValidity() {}

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
    this._inputEls = [...this.form.querySelectorAll(this._inputSelector)];
    this._submitButton = this.form.querySelector(
      options.this._submitButtonSelector
    );
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this.form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  // ------------------------------------------------------------------------------

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  }
}
// ------------------------------------------------------------------------------

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();
// const addFormValidator = new FormValidator(settings, addForm);
