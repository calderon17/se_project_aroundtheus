import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";

//________

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/Popupwithform.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";
import { data } from "autoprefixer";

// //_______

import {
  initialCards,
  profileEditButton,
  profileEditModal,
  addCardModal,
  profileModalCloseButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  addCardModalCloseButton,
  addNewCardButton,
  profileEditForm,
  addCardFormElement,
  cardTitleInput,
  cardUrlInput,
  cardListEl,
  cardImageEL,
  Template,
  modalImageElement,
  imageModalcaption,
  preImgModalCloseButton,
  cardSelector,
  settings,
} from "../utils/constants.js";

console.log(initialCards);
console.log(profileEditButton);
//________________sprint 8

// instances

// create a card using the Card class
// render the card using cardSection.addItem(<pass-in-element-here>)
// cardSection.renderCard(cardData); didnt work
// call the render card function that has both
// cardSection.addItem(cardData);
// createCard.inputValues();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

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
imagePreviewPopup.setEventListeners();

function handleImagePreview(cardData) {
  /*modalImageElement.src = cardData.link;
  modalImageElement.alt = cardData.name;*/
  imageModalcaption.textContent = cardData.name;
  imagePreviewPopup.open(cardData);
}

const userInfor = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
}); // should be good

//initiate  previous instances

// replace where is needed in the event handlesrs and listeners for all 4.

//----------------------------------------------------------------------------------------
//                                     Functions
//----------------------------------------------------------------------------------------
function createCard(item) {
  const card = new Card(item, cardSelector, handleImagePreview);
  return card.getview();
}

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//----------------------------------------------------------------------------------------
//                                  Event Handlers
//----------------------------------------------------------------------------------------

function handleProfileEditSubmit(inputData) {
  console.log(inputData);
  // profileTitle.textContent = inputData.name;
  // profileDescription.textContent = inputData.description;
  userInfor.getUserInfo({
    name: inputData.name,
    description: inputData.description,
  });
}

function handleAddCardFormSubmit(inputValues) {
  console.log(inputValues);
  cardSection.addItem(
    createCard({ name: inputValues.title, link: inputValues.url })
  );
  addCardPopup.close();
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
  editProfilePopup.open();
});

// profileEditForm.addEventListener("submit", editProfilePopup);

// initialCards.forEach(renderCard);

// Add new card

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//////////////////////////////////////////////
