const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//----------------------------------------------------------------------------------------
//                                      Elements
//----------------------------------------------------------------------------------------
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector("#modal-close");
const addCardModalCloseButton = addCardModal.querySelector("#modal-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-name");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addNewCardButton = document.querySelector(".profile__add-button");

const profileEditForm = profileEditModal.querySelector("#modal-form");
const addCardFormElement = addCardModal.querySelector("#modal-form");

const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-url-input");

const cardListEl = document.querySelector(".cards__list");
const cardImageEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#preview-image-modal");
const modalImageElement = previewImageModal.querySelector(".modal__img");
const ImageModalcaption = previewImageModal.querySelector(".modal__caption");
const preImgModalCloseButton = previewImageModal.querySelector("#modal-close");

//----------------------------------------------------------------------------------------
//                                     Functions
//----------------------------------------------------------------------------------------
/////////////////////////////
function handleEsc(evt) {
  if (evt.key === "Escape") {
    document.querySelector(".modal_opened");
    closePopup(handleEscUp);
  }
}

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closePopup);
};

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.addEventListener("keydown", handleEscUp);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.removeEventListener("keydown", handleEscUp);
}

/////////////////////

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const removeButton = cardElement.querySelector(".card__remove-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  removeButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEL.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    ImageModalcaption.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  cardImageEL.alt = cardData.name;

  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// Close on overlay

function overlayClose(modalElement) {
  modalElement.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      closePopup(modalElement);
    }
  });
}

overlayClose(profileEditModal);
overlayClose(addCardModal);
overlayClose(previewImageModal);

//----------------------------------------------------------------------------------------
//                                  Event Handlers
//----------------------------------------------------------------------------------------

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

//----------------------------------------------------------------------------------------
//                                 Events listeners
//----------------------------------------------------------------------------------------

//profiel Edit

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach(renderCard);

// Add new card

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

preImgModalCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);
