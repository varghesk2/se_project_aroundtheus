import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Vally",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardsWrap = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addModal = document.querySelector("#modal__add-card");
const addModalForm = addModal.querySelector(".modal__form");
const closeAddButton = addModal.querySelector(".modal__close");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const pictureModal = document.querySelector("#modal__picture");
const pictureImage = document.querySelector(".modal__picture-img");
const pictureTitle = document.querySelector(".modal__picture-title");
const pictureClose = document.querySelector(".modal__picture-close");

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileForm = document.querySelector(".modal__form");

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);

editProfileValidator.enableValidation();

const addCardForm = document.querySelector("#add-card-form");
const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", "#modal__add-card");
  const cardElement = card.getView();
  wrapper.append(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);

  closePopup(addModal);
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal.modal_opened");
    if (openModal) {
      closePopup(openModal);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileEditButton.addEventListener("click", () => {
  // Fill inputs with current profile info
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  // Clear validation errors and reset button state
  const inputEls = [...profileEditForm.querySelectorAll(config.inputSelector)];
  const submitButton = profileEditForm.querySelector(
    config.submitButtonSelector
  );

  inputEls.forEach((inputEl) => {
    hideInputError(profileEditForm, inputEl, config);
  });

  toggleButtonState(inputEls, submitButton, config);

  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

initialCards.forEach((card) => {
  renderCard(card, cardsWrap);
});

addModalForm.addEventListener("submit", handleAddCardSubmit);

profileAddButton.addEventListener("click", () => {
  addModalForm.reset(); // clear inputs

  openPopup(addModal);

  const inputEls = [...addModalForm.querySelectorAll(config.inputSelector)];
  const submitButton = addModalForm.querySelector(config.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    hideInputError(addModalForm, inputEl, config); // clear errors
  });

  toggleButtonState(inputEls, submitButton, config); // disable button
});

closeAddButton.addEventListener("click", () => closePopup(addModal));

pictureClose.addEventListener("click", () => closePopup(pictureModal));

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closePopup(modal);
    }
  });
});
