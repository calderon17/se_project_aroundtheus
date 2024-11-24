//----------------------------------------------------------------------------------------
//                                  Actual card
//----------------------------------------------------------------------------------------

export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImagePreview,
    deleteCardModal,
    handleCardLike
  ) {
    this.name = name;
    this.link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
    this._deleteCardModal = deleteCardModal;
    this._handleCardLike = handleCardLike;
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
    this._deleteCard.addEventListener("click", () =>
      this._deleteCardModal(this._id, this)
    );

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });

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
  updateLike(isLiked) {
    if (isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
    this._isLiked = isLiked;
  }

  //------------------------------------------------------------
  getview() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this.name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      this._likeButton.classList.toggle("card__like-button_active");
    }
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteCard = this._cardElement.querySelector(".card__remove-button");
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;

    this._setEventListeners();

    return this._cardElement;
  }

  // likeCard() {
  //   this._likeButton.classList.add("card__like-button_active");
  //   this._isLiked = true;
  // }

  // unlikeCard() {
  //   this._likeButton.classList.remove("card__like-button_active");
  //   this._isLiked = false;
  // }
}
