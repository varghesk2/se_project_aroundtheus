import UserInfo from "./UserInfo.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
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
