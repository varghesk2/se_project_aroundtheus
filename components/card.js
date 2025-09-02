export default Card

class Card {
  constructor(data, cardSelector, modalSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;

    this._modal = document.querySelector(modalSelector);
    this._modalImg = this._modal.querySelector(".modal__picture-img");
    this._modalTitle = this._modal.querySelector(".modal__picture-title");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handlePreviewPicture() {
    this._modalImg.src = this._image;
    this._modalImg.alt = this._title;
    this._modalTitle.textContent = this._title;

    this._modal.classList.add("modal_opened");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._title;
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._title;

    this._setEventListeners();

    return this._element;
  }
}
