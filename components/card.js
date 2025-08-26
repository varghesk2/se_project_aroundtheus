const modalPictureEl = document.querySelector("#modal__picture");
const modalPictureImgEl = previewModal.querySelector(".modal__picture-img");
const modalPictureTitleEl = previewModal.querySelector(
  ".modal__picture-title"
);

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__image")
      .classList.toggle("card__like-button_active");
  }

  _handlePreviewPicture() {
    modalPictureImgEl.src = this._link;
    modalPictureImgEl.alt = this._name;
    modalPictureTitleEl.textContent = this._name;
    openModal(modalPictureEl);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").style.backgroundImage =
      "url(${this._link})";
    this._element.querySelector(".card__title").textContent = this._text;
  }
}

export default Card;
