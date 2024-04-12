const previewImageModal = document.querySelector("#preview-image-modal");
const modalImageElement = previewImageModal.querySelector(".modal__img");
const ImageModalcaption = previewImageModal.querySelector(".modal__caption");
const preImgModalCloseButton = previewImageModal.querySelector("#modal-close");

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

//----------------------------------------------------------------------------------------
//                                  Actual card
//----------------------------------------------------------------------------------------

export default class Card {
  constructor({ name, link }, cardSelector, _handleImagePreview) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  //------------------------------------------------------------
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //------------------------------------------------------------
  _setEventListeners() {
    //.card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeIcon);

    // .card__remove-button
    this._cardElement
      .querySelector(".card__remove-button")
      .addEventListener("click", this._handleDeleteCard);

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", this._handleImagePreview);
  }

  //------------------------------------------------------------
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  //------------------------------------------------------------
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  //------------------------------------------------------------
  _handleImagePreview(cardData) {
    modalImageElement.src = cardData.this._link;
    modalImageElement.alt = cardData.this._name;
    ImageModalcaption.textContent = cardData.this._name;
    openPopup(previewImageModal);
  }

  //------------------------------------------------------------
  getview() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(
      ".card__image"
    ).style.backgroundImagae = `url(${this._link})`;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
