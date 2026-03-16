class Card {
  constructor(
    data,
    cardSelector,
    userId,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._title = data.name;
    this._image = data.link;
    this._isLiked = data.isLiked || false;

    this._ownerId = data.owner._id || data.owner;
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

    console.log("Owner:", this._ownerId, "Current user:", this._userId);

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

    this.updateLikes(this._isLiked);

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick();
      });
    }
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("card__like-button_active", isLiked);
  }

  isLiked() {
    return this._isLiked;
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