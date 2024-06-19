import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";

//________

import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/Popupwithform.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";

//_______

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

const profileEditForm = profileEditModal.querySelector("#modal-form");
const addCardFormElement = addCardModal.querySelector("#modal-form");
const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-url-input");

const cardListEl = document.querySelector(".cards__list");
const cardImageEL = document.querySelector(".cards__list");
const Template =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#preview-image-modal");
const modalImageElement = previewImageModal.querySelector(".modal__img");
const imageModalcaption = previewImageModal.querySelector(".modal__caption");
const preImgModalCloseButton = previewImageModal.querySelector("#modal-close");

//________________sprint 8

// instances

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      // create a card using the Card class
      // render the card using cardSection.addItem(<pass-in-element-here>)
      // cardSection.renderCard(cardData); didnt work
      //call the render card function that has both
      cardSection.addItem(cardData);
    },
  },
  ".cards__list"
);

const addCardPopup /* */ = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// //adjust both add and edit instances

const imagePreviewPopup = new PopupWithImage("#preview-image-modal"); //should be good
// imagePreviewPopup.popupSelector;

// const userInfor = new UserInfo({
//   profileName: "#some-id",
//   jobElement: "#some-other-id",
// }); // should be good

//initiate  previous instances

// editProfilePopup.open();

// replace where is needed in the event handlesrs and listeners for all 4.

//----------------------------------------------------------------------------------------
//                                     Functions
//----------------------------------------------------------------------------------------
function createCard(item) {
  const card = new Card(item, cardSelector, handleImagePreview);
  return card.getview();
}

function renderCard(item) {
  const cardElement = createCard(item);
  cardListEl.prepend(cardElement);
}

// function handleEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closePopup(openedModal);
//   }
// }

// function closePopup(popup) {
//   popup.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEsc);
// }

// function openPopup(popup) {
//   popup.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEsc);
// }

// Close on overlay

// function addCloseListener(modalElement) {
//   modalElement.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("modal") ||
//       evt.target.classList.contains("modal__close")
//     ) {
//       closePopup(modalElement);
//     }
//   });
// }

// addCloseListener(profileEditModal);
// addCloseListener(addCardModal);
// addCloseListener(previewImageModal);

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

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//----------------------------------------------------------------------------------------
//                                  Event Handlers
//----------------------------------------------------------------------------------------

function handleProfileEditSubmit() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfilePopup.close(profileEditModal);
}

function handleAddCardFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  cardSection.addItem({ name, link }); /*cardListEl*/
  addCardPopup.close(addCardModal);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  addFormValidator.resetValidation();
}
//----------------------------------------------------------------------------------------
//                                 Events listeners
//----------------------------------------------------------------------------------------

//profiel Edit

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editProfilePopup.open(profileEditModal);
});

// profileEditForm.addEventListener("submit", editProfilePopup);

initialCards.forEach(renderCard);

// Add new card

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open(addCardModal);
});

// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//////////////////////////////////////////////

function handleImagePreview(cardData) {
  modalImageElement.src = cardData.link;
  modalImageElement.alt = cardData.name;
  imageModalcaption.textContent = cardData.name;
  imagePreviewPopup.open(previewImageModal);
}
