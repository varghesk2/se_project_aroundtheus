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
    const errorSpan = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorSpan.textContent = errorMessage;
    errorSpan.classList.add(this._errorClass);
  }

  _setEventListeners() {
    this.inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this.inputButton = this._form.querySelector(this._submitButtonSelector);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.inputButton.classList.add(this._inactiveButtonClass);
      this.inputButton.disabled = true;
    } else {
      this.inputButton.classList.remove(this._inactiveButtonClass);
      this.inputButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  enableValidation() {
    this._form.addEventListener("sumbit", (evt) => {
      evt.preventdefault();
    });
    _setEventListeners(formElement, rest);
  }
}

export default FormValidator; 