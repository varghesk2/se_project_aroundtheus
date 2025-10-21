import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";

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

const editProfileValidator = new FormValidator(config, profileEditForm);

editProfileValidator.enableValidation();

const addCardForm = document.querySelector("#add-card-form");
const addCardValidator = new FormValidator(config, addCardForm);
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
  const card = new Card(cardData, "#card-template", "#modal__picture");
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
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
  addModalForm.reset(); 
  const inputEls = [...addModalForm.querySelectorAll(config.inputSelector)];
  const submitButton = addModalForm.querySelector(config.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, config); 
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
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  const inputEls = [...profileEditForm.querySelectorAll(config.inputSelector)];
  const submitButton = profileEditForm.querySelector(
    config.submitButtonSelector
  );

  inputEls.forEach((inputEl) => {});

  editProfileValidator.resetValidation();
  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  openPopup(addModal);
});

initialCards.forEach((card) => {
  renderCard(card, cardsWrap);
});

addModalForm.addEventListener("submit", handleAddCardSubmit);

closeAddButton.addEventListener("click", () => closePopup(addModal));

pictureClose.addEventListener("click", () => closePopup(pictureModal));

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closePopup(modal);
    }
  });
});
