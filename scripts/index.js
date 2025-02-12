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
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector("#profile-description-input");

const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector('.card__list');

const cardTemplate = 
document.querySelector("#card-template").textContent.firstElementChild;


function closePopup() {
    profileEditModal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup();
}



profileEditButton.addEventListener ("click", () =>
     {
console.log ("modal clicked")
profileTitleInput.value = profileTitle.textcontent
profileDescriptionInput.value = profileDescription.textcontent

profileEditModal.classList.add("modal_opened");
});

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".clone__image");
    const cardTitleEl = cardElement.querySelector(".clone__title");
    cardTitleEl.textContent = cardData.name;
    return cardElement;
}

 
profileEditCloseButton.addEventListener ("click", () => {
    profileEditModal.classList.remove("modal_opened");
    });

    profileEditCloseButton.addEventListener("click", closePopup);

    profileEditForm.addEventListener("submit", handleProfileEditSubmit);


    function getCardElement(data) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImageEl = cardElement.querySelector(".clone__image");
        const cardTitleEl = cardElement.querySelector(".clone__Title");
        cardTitleEl.textContent = cardData.name;
        return cardElement
      }

      
      initialCards.forEach((cardData) => {
        const cardElement = getCardElement(cardData);
      
        cardListEl.prepend(cardElement);
      });
