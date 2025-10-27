import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import {
  initialCards,
  validationConfig,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardForm,
  profileEditModal,
  profileEditCloseButton,
  profileAddButton,
  profileTitle,
  profileDescription,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

const editProfileValidator = new FormValidator(validationConfig, profileEditModal);

editProfileValidator.enableValidation();

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

  const inputEls = [...profileEditForm.querySelectorAll(validationConfig.inputSelector)];
  const submitButton = profileEditForm.querySelector(
    validationConfig.submitButtonSelector
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


/* -------------------------------------------------------------------------- */
/*                               instances                                    */
/* -------------------------------------------------------------------------- */




const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;

  editFormValidator.resetValidation();
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  userInfo.setUserInfo({
    name: profileTitleInput.value,
    description: profileDescriptionInput.value,
  });

  closePopup(profileEditModal);
});

const imagePopup = new PopupWithImage("#modal__picture");
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const editProfilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo({
    name: formData.title,
    job: formData.description,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#modal__add-card", (formData) => {
  const newCard = createCard({ name: formData.title, link: formData.url });
  cardSection.addItem(newCard);
  addCardPopup.close();
});
addCardPopup.setEventListeners();