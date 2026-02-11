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
import Api from "../components/Api.js";
import PopupForDelete from "../components/PopupForDelete.js";


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_us_03",
  headers: {
    authorization: "YOUR_API_TOKEN_HERE",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});


const cardsSection = new Section(...);

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputData) => {
    api.setUserInfo({
      name: inputData.name,
      about: inputData.description,
    })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          description: userData.about,
        });
        editProfilePopup.close();
      })
      .catch(console.error);
        .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  }
);

editProfilePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-edit-modal", (inputData) => {
  api.updateAvatar(inputData.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
      });
      avatarPopup.close();
    })
    .catch(console.error);
});

avatarPopup.setEventListeners();

const profileAvatar = document.querySelector("#profile-avatar");

profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
});

const addCardPopup = new PopupWithForm(
  "#modal__add-card",
  (inputData) => {
    api.addCard({
      name: inputData.title,
      link: inputData.url,
    })
      .then((cardData) => {
        const cardElement = createCard(cardData);
        cardsSection.addItem(cardElement);
        addCardPopup.close();
      })
      .catch(console.error);
            .finally(() => {
        addCardPopup.renderLoading(false);
      });
  }
);

addCardPopup.setEventListeners();


const editProfileValidator = new FormValidator(validationConfig, profileEditModal);

editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

const confirmDeletePopup = new PopupWithConfirmation("#confirm-delete-modal");
confirmDeletePopup.setEventListeners();


/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", (data) =>
    imagePopup.open(data)
  );
  return card.getView();
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    () => imagePopup.open(data),
    () => {
      api
        .likeCard(data._id)
        .then((res) => card.updateLikes(res.likes))
        .catch(console.error);
    },
    () => {
      api
        .unlikeCard(data._id)
        .then((res) => card.updateLikes(res.likes))
        .catch(console.error);
    },
    () => {
      api
        .deleteCard(data._id)
        .then(() => card.removeCard())
        .catch(console.error);
    }
      currentUserId, 
    () => imagePopup.open({ name: data.name, link: data.link }),
    () => handleLikeClick(card),
    () => handleDeleteClick(card, data._id)
  );


  return card.generateCard();
}

function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      _id: data._id,
      owner: data.owner,
      likes: data.likes || [],
    },
    "#card-template",
    () => imagePopup.open(data),
    () => handleLikeClick(card, data._id),
    () => handleDeleteClick(card, data._id)
  );

  return card.generateCard();
}

function handleDeleteClick(card, cardId) {
  confirmDeletePopup.setSubmitAction(() => {
    api.deleteCard(cardId)
      .then(() => {
        card.removeCard();
        confirmDeletePopup.close();
      })
      .catch(console.error);
  });

function handleLikeClick(card) {
  if (!card.isLiked()) {
    api.likeCard(card.getId())
      .then((updatedCard) => {
        card.updateLikes(updatedCard.likes);
      })
      .catch(console.error);
  } else {
    api.unlikeCard(card.getId())
      .then((updatedCard) => {
        card.updateLikes(updatedCard.likes);
      })
      .catch(console.error);
  }
}

  confirmDeletePopup.open();
}

/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */

profileAddButton.addEventListener("click", () => {
addCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                               instances                                    */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;
editProfileValidator.resetValidation();
editProfilePopup.open();
});

const imagePopup = new PopupWithImage("#modal__picture");
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItem(renderCard(data));
    },
  },
  ".cards__list"
);

cardSection.renderItems(initialCards);

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputData) => {
    api.setUserInfo({
      name: formData.name,
      about: formData.description,
    })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          description: userData.about,
        });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
            .finally(() => {
        addCardPopup.renderLoading(false);
      });
  }
);

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#modal__add-card", (formData) => {
  cardSection.addItem(renderCard({ name: formData.title, link: formData.url }));
  addCardForm.reset();
  addCardValidator.resetValidation();
  addCardPopup.close();
});

const addCardPopup = new PopupWithForm(
  "#modal__add-card",
  (inputData) => {
    api.addCard({
      name: inputData.title,
      link: inputData.url,
    })
      .then((cardData) => {
        const cardElement = createCard(cardData);
        cardsSection.addItem(cardElement);
        addCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

addCardPopup.setEventListeners();

const myObj = 

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "0f60e1c6-c72a-4db2-a372-577372b3a7d9",
  },
}).then((res) => res.json());




api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.error("Failed to load user info:", err);
  });

api
  .getAppData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    cardsSection.renderItems(cards);
  })
  .catch((err) => console.error(err));

  let currentUserId;

api.getAppData()
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

  api.getInitialCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardsSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error("Failed to load cards:", err);
  });