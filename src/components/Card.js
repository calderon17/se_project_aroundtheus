//----------------------------------------------------------------------------------------
//                                  Actual card
//----------------------------------------------------------------------------------------

export default class Card {
  constructor(
    { name, link, _id, handleCardLike },
    cardSelector,
    handleImagePreview,
    deleteCardModal
  ) {
    this.name = name;
    this.link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
    this._deleteCardModal = deleteCardModal;
    this._handleCardLike = handleCardLike;
  }

  // one function is pass it from index to card.js in constructor , then saves it in card.js then eventlistener goes to index.js

  // one function updates the apearence of the like button

  //------------------------------------------------------------
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //------------------------------------------------------------
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteCard.addEventListener("click", () =>
      this._deleteCardModal(this._id, this)
    );

    // this._confrimDeleteButton.addEventListener("click", this._handleDeleteCard);

    // this._deleteCard.addEventListener("click", yes__delete_button);

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
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
  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  // _handleLikeIcon() {
  //   if (this._likeButton.classList.contains("card__like-button_active")) {
  //     api
  //       .dislikeCard(this._id)
  //       .then(() => {
  //         this._likeButton.classList.toggle("card__like-button_active");
  //       })
  //       .catch((err) => console.error("Error removing like from card:", err));
  //   } else {
  //     api
  //       .likeCard(this._id)
  //       .then(() => {
  //         this._likeButton.classList.toggle("card__like-button_active");
  //       })
  //       .catch((err) => console.error("Error adding like to card:", err));
  //   }
  // }

  //------------------------------------------------------------
  getview() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this.name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteCard = this._cardElement.querySelector(".card__remove-button");
    // this._confrimDeleteButton = this._cardElement.querySelector(
    //   ".yes__delete-button"
    // );

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
