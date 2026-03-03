class Card {
  constructor(
    data,
    cardSelector,
    userId,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes || [];
    this._ownerId = data.owner?._id;
    this._cardId = data._id;

    this._userId = userId;

    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this.updateLikes(this._likes);

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", this._handleImageClick);

    this._likeButton.addEventListener("click", this._handleLikeClick);

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", this._handleDeleteClick);
    }
  }

  updateLikes(likes) {
    this._likes = likes;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  getId() {
    return this._cardId;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
