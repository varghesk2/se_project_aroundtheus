function showInputError (formEl, inputEl, {inputErrorClass, errorClass}) {
  const errorMessageEl = formEl.querySelector(`#${formEl.id}-error`);
  inputEl.classlist.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classlist.add (errorClass);
}

function hideInputError (formEl, inputEl, {inputErrorClass, errorClass}) {
  const errorMessageEl = formEl.querySelector(`#${formEl.id}-error`);
  inputEl.classlist.remove(inputErrorClass);
  errorMessageEl.textContent = '';
  errorMessageEl.classlist.remove(errorClass);
}

function checkInputValidity (formEl, inputEl, options) {
  if(!inputEl.validity.valid) {
    return showInputError (formEl, inputEl, options);
  }
    hideInputError (formEl, inputEl, options);
  
}

function hasInvalidInput (inputList) {
  return !inputList.every((inputEl) => input.validity.valid);
}

function toggleButtonState (inputEls, submitButton){


  if(hasInvalidInput(inputEls)){
    submitButton.classlist.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  } 
    submitButton.classlist.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

function setEventListeners (formEl, options) {
    const { inputSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector('.modal__button');
    inputEls.forEach ( => {
      inputEl.addEventListener("input", (inputEl) => {
        checkInputValidity (formEl, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });

}

function enableValidation(options) {
const formEls = [...document.querySelectorAll(options.formSelector)];
formEls.forEach ((formEls) => {
formEl.addeventlistener ("submit", (e) =>{
e.preventdefault();
});

setEventListeners(FormElement, options);

});
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
