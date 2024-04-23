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
    // this._cardElement
    //   .querySelector(".card__like-button")
    this._likeButton.addEventListener("click", this._handleLikeIcon);

    // this._cardElement
    //   .querySelector(".card__remove-button")

    this._deleteCard.addEventListener("click", this._handleDeleteCard);

    // this._cardElement;
    // .querySelector(".card__image")
    this._cardImage.addEventListener("click", () => {
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
  getview() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(".card__image").alt = this.name;
    this._cardElement.querySelector(".card__title").textContent = this.name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteCard = this._cardElement.querySelector(".card__remove-button");

    this._setEventListeners();

    return this._cardElement;
  }
}
