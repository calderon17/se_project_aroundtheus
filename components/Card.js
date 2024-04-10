export default class Card {
  constructor({ name, link }, cardSelector) {
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
  _handleImagePreview() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    openPopup(previewImageModal);
  }

  //------------------------------------------------------------
  getview() {
    this._cardElement = this._getTemplate();

    // get the card view
    // set event listeners
    this._setEventListeners();
    // return the card
    /////
    // cardTitleEL.textContent = cardData.name;
    // cardImageEL.src = cardData.link;
    // return cardElement;
  }
}
