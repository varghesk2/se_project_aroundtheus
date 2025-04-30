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

const addModal = document.querySelector("#add-card-modal");
const addButton = document.querySelector("#add-button");
const closeAddButton = document.querySelector("#modal-close");
const cardTitleInput = document.querySelector("#modal__input_type_title");
const cardUrlInput = document.querySelector("#modal__input_type_url");

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */
 
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}
 
function renderCard() (cardData, wrapper) {
const cardElement = getCardElement(cardData);
wrapper.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
 
function handleAddCardSubmit(e) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard ((name, link), cardsWrap);
  closePopup(addModal);
}


function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}
 
/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */
 

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});
 
profileEditCloseButton.addEventListener("click", () => {

  profileEditModal.classList.remove("modal_opened");
  closePopup();
});
 
 
initialCards.forEach((cardData, cardsWrap) => renderCard);
 


profileEditForm.addEventListener("submit", handleProfileEditSubmit);



addModal.addEventListener("submit", handleAddCardSubmit);

addButton.addEventListener("click", () => openModal(addModal));
closeAddButton.addEventListener("click", () => closeModal(addModal))

