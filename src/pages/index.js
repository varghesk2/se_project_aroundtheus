import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import {
  validationConfig,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardForm,
  profileAddButton,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupForDelete from "../components/PopupForDelete.js";

/* -------------------------------------------------------------------------- */
/*                                   API                                      */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f3dc3505-42e4-4aa4-bf0a-c48d54235c54",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                                USER INFO                                   */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: "#profile-avatar",
});

let currentUserId;

/* -------------------------------------------------------------------------- */
/*                              CARD SECTION                                  */
/* -------------------------------------------------------------------------- */

const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    currentUserId,
    () => imagePopup.open({ name: data.name, link: data.link }),
    () => handleLikeClick(card),
    () => handleDeleteClick(card, data._id)
  );

  return card.getView();
}

function handleLikeClick(card) {
  if (!card.isLiked()) {
    api
      .likeCard(card.getId())
      .then((updatedCard) => {
        card.updateLikes(updatedCard.likes);
      })
      .catch(console.error);
  } else {
    api
      .unlikeCard(card.getId())
      .then((updatedCard) => {
        card.updateLikes(updatedCard.likes);
      })
      .catch(console.error);
  }
}

function handleDeleteClick(card, cardId) {
  confirmDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        confirmDeletePopup.close();
      })
      .catch(console.error);
  });

  confirmDeletePopup.open();
}

/* -------------------------------------------------------------------------- */
/*                                  POPUPS                                    */
/* -------------------------------------------------------------------------- */

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputData) => {
    editProfilePopup.renderLoading(true);

    api
      .setUserInfo({
        name: inputData.name,
        about: inputData.description,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar,
        });
        editProfilePopup.close();
      })
      .catch(console.error)
      .finally(() => editProfilePopup.renderLoading(false));
  }
);

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#modal__add-card", (inputData) => {
  addCardPopup.renderLoading(true);

  api
    .addCard({
      name: inputData.title,
      link: inputData.url,
    })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardsSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch(console.error)
    .finally(() => addCardPopup.renderLoading(false));
});

addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#modal__picture");
imagePopup.setEventListeners();

const confirmDeletePopup = new PopupForDelete("#modal__delete");
confirmDeletePopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                              VALIDATION                                    */
/* -------------------------------------------------------------------------- */

const editProfileValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                              EVENT LISTENERS                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;

  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                              INITIAL LOAD                                  */
/* -------------------------------------------------------------------------- */

api
  .getAppData()
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });

    cardsSection.renderItems(cards);
  })
  .catch(console.error);
