class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(input) {
    const errorSpan = this._form.querySelector("#${inputElemnt.id}-error");
    inputElement.classList.add(this._inputErrorClass);
    errorSpan.textContent = errorMessage;
    errorSpan.classList.add(this._errorClass);
  }

  _setEventListeners() {
    this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
    this.inputButton = this.form.querySelector(this.submitButtonSelector);

    this.inputList.forEach ((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(this.form, inputElement, rest);
        toggleButtonState(this.inputList, buttonElement, inactiveButtonClass);
      });
    });
}

  enableValidation() {
    this._form.addEventListener("sumbit",(evt) => {
      evt.preventdefault(); 
    });
    _setEventListeners(formElement, rest);
  }
}

export default FormValidator; 