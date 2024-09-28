import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";

//________

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/Popupwithform.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";
import PopupConfirmDelete from "../components/PopupConfrimDelete.js";
// import { data } from "autoprefixer";

// //_______

//Project 9//

//request to the /cards endpoint looks like:

// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   headers: {
//     authorization: "c801e776-9008-430b-a7ca-bcf7d2aaaf7f",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

//---------------------------------------------------------------

class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "c801e776-9008-430b-a7ca-bcf7d2aaaf7f",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c801e776-9008-430b-a7ca-bcf7d2aaaf7f",
    "Content-Type": "application/json",
  },
});

//Process errors inside catch()

api
  .getInitialCards()
  .then((result) => {
    // process the result
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//-View requests in the Network panel.
//-Cards should be rendered after the user information is received from the server.

//1. Loading user information from the server

fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  method: "GET",
  about: "Placeholder description",
  avatar:
    "https://practicum-content.s3.amazonaws.com/resources/default-avatar_1704458546.png",
  name: "Placeholder name",
  _id: "c801e776-9008-430b-a7ca-bcf7d2aaaf7f",
  // the about, avatart and name properties go to the apropiate headers, which headers?
});

//2. Loading cards from the server

//
//-------------------------------------------------------------------
//

import {
  initialCards,
  profileEditButton,
  // profileEditModal,
  // addCardModal,
  // profileModalCloseButton,
  // profileTitle,
  // profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  // addCardModalCloseButton,
  addNewCardButton,
  profileEditForm,
  addCardFormElement,
  // cardTitleInput,
  // cardUrlInput,
  // cardListEl,
  // cardImageEL,
  // Template,
  // modalImageElement,
  // imageModalcaption,
  // preImgModalCloseButton,
  cardSelector,
  settings,
} from "../utils/constants.js";

console.log(initialCards);
console.log(profileEditButton);

// instances

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

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage("#preview-image-modal"); //should be good
imagePreviewPopup.setEventListeners();

const userInfor = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
});

const confirmDelete = new PopupConfirmDelete("#delete-image-modal");
//----------------------------------------------------------------------------------------
//                                     Functions
//----------------------------------------------------------------------------------------
function createCard(item) {
  const card = new Card(
    item,
    cardSelector,
    handleImagePreview,
    (cardId, card) => {
      deleteCardModal(cardId, card); //here
    },
    (cardId, isLiked, cardElement) => {
      handleLikeIcon(cardId, isLiked, cardElement, card);
    }
  );
  return card.getview();
}

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleImagePreview(cardData) {
  imagePreviewPopup.open(cardData);
}
// Project 9

function deleteCardModal(cardId, card) {
  confirmDelete.setSubmitFunction(() => {
    api
      .handleDeleteCard(cardId)
      .then(() => {
        card.handleDeleteCard();
        confirmDelete.close();
      })
      .catch(console.error);
  });
  confirmDelete.open();
}

//----------------------------------------------------------------------------------------
//                                  Event Handlers
//----------------------------------------------------------------------------------------

function handleProfileEditSubmit(inputData) {
  userInfor.setUserInfo({
    title: inputData.name,
    description: inputData.description,
  });
}

function handleAddCardFormSubmit(inputValues) {
  console.log(inputValues);
  cardSection.addItem(
    createCard({ name: inputValues.title, link: inputValues.url })
  );
  addCardPopup.close();
  addCardFormElement.reset();
  addFormValidator.resetValidation();
}

//----------------------------------------------------------------------------------------
//                                 Events listeners
//----------------------------------------------------------------------------------------

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfor.getUserInfo();
  profileTitleInput.value = currentUserInfo.title;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
