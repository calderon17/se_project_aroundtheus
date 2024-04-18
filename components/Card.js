//----------------------------------------------------------------------------------------
//                                  Actual card
//----------------------------------------------------------------------------------------

export default class Card {
  constructor({ name, link }, cardSelector, handleImagePreview) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
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
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeIcon);

    this._cardElement
      .querySelector(".card__remove-button")
      .addEventListener("click", this._handleDeleteCard);

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImagePreview(this);
      });
  }

  //------------------------------------------------------------
  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };
  //------------------------------------------------------------
  _handleLikeIcon = () => {
    // this._cardElement
    //   .querySelector(".card__like-button")
    //   .classList.toggle("card__like-button_active");
    // --- OG code--
    this._likeButton.classList.toggle("card__like-button_active");
  };
  //------------------------------------------------------------
  // _handleImagePreview() {
  //   modalImageElement.src = this._link;
  //   modalImageElement.alt = this._name;
  //   imageModalcaption.textContent = this._name;
  //   openPopup(previewImageModal);
  // }

  //------------------------------------------------------------
  getview() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(".card__image").alt = this.name;
    this._cardElement.querySelector(".card__title").textContent = this.name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    // this.cardImage = this._cardElement.querySelector(".card__image");
    // tried with _setEventListeners, did not work,
    // i dont know if it was only the like button.

    return this._cardElement;
  }
}
