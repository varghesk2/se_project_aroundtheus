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


const editProfileValidator = new FormValidator(validationConfig, profileEditModal);

editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", (data) =>
    imagePopup.open(data)
  );
  return card.getView();
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

const editProfilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo({
    name: formData.title,
    description: formData.description,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

renderCard({ name: formData.title, link: formData.url });
addCardValidator.resetValidation();
addCardPopup.close();
addCardPopup.setEventListeners();



