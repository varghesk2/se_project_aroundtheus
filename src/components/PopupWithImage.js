import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popup.querySelector(".modal__picture-img");
    this._captionElement = this._popup.querySelector(".modal__picture-title");
  }

  open(data) {

    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    this._captionElement.textContent = data.name;

    super.open();
  }
}
