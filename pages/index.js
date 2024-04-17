import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// const card = new Card(cardData, "#card-template");
// card.getview();

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

const profileEditForm = document.forms["modal-form"];
const addCardFormElement = document.forms["modal-form"];

const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-url-input");

const cardListEl = document.querySelector(".cards__list");
const cardImageEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#preview-image-modal");
const modalImageElement = previewImageModal.querySelector(".modal__img");
const imageModalcaption = previewImageModal.querySelector(".modal__caption");
const preImgModalCloseButton = previewImageModal.querySelector("#modal-close");

//----------------------------------------------------------------------------------------
//                                     Functions
//----------------------------------------------------------------------------------------
function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
  // resetValidation();
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

// function renderCard(cardData) {
//   const card = new Card(cardData, cardSelector, handleImagePreview);
//   const cardElement = card.getview();
//   cardListEl.prepend(cardElement);
// }///////////////////////////////    this is how i had it before

function createCard() {
  const card = new Card(cardData, cardSelector, handleImagePreview);
  return cardElement.getview(createCard);
}

function renderCard() {
  createCard();
  const cardElement = card.getview();
  cardListEl.prepend(cardElement);
}

// Close on overlay

function addCloseListener(modalElement) {
  modalElement.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      closePopup(modalElement);
    }
  });
}

addCloseListener(profileEditModal);
addCloseListener(addCardModal);
addCloseListener(previewImageModal);

//----------------------------------------------------------------------------------------
//                                     Validation
//----------------------------------------------------------------------------------------
///validation

const cardSelector = "#card-template";

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// const editFormEl = profileEditModal.querySelector(".modal__form");
// const addFormEl = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

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
// profileModalCloseButton.addEventListener("click", () =>
//   closePopup(profileEditModal)
// );
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach(renderCard);

// Add new card

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// addCardModalCloseButton.addEventListener("click", () =>
//   closePopup(addCardModal)
// );

// preImgModalCloseButton.addEventListener("click", () =>
//   closePopup(previewImageModal)
// );

//////////////////////////////////////////////

function handleImagePreview(cardData) {
  modalImageElement.src = cardData._link;
  modalImageElement.alt = cardData._name;
  imageModalcaption.textContent = cardData._name;
  openPopup(previewImageModal);
}

// function resetValidation() {
//   toggleButtonState();
//   inputList.forEach((inputElement) => {
//     hideError(inputElement);
//   });
// }
