import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";

//________

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/Popupwithform.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";
import PopupConfirmDelete from "../components/PopupConfrimDelete.js";
import Api from "../components/Api.js";

// //_______

//Project 9//

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

// cardSection.renderItems();

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

// Instantiating  PopupConfirmDelete project 9

const confirmDelete = new PopupConfirmDelete("#delete-image-modal");

confirmDelete.setEventListeners();

//Project 9

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c801e776-9008-430b-a7ca-bcf7d2aaaf7f", // my special token
    "Content-Type": "application/json",
  },
});

// Example of using the getInitialCards method
api
  .getInitialCards()
  .then((data) => {
    cardSection.renderItems(data);
    console.log(data);
    // console.log("Fetched Cards:", data);
  })
  .catch((err) => {
    console.error(err);
  });

//----------------------------------------------------------------------------------------
//                                     Functions
//----------------------------------------------------------------------------------------
function createCard(item) {
  const card = new Card(
    item,
    cardSelector,
    handleImagePreview,
    (cardId, card) => {
      deleteCardModal(cardId, card);
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
      .catch((err) => console.error("Error deleting card:", err));
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
  api
    .addCard({
      name: inputValues.title,
      link: inputValues.url,
    })
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addCardPopup.close();
      addCardFormElement.reset();
      addFormValidator.resetValidation();
    })
    .catch((err) => console.error("Error adding card:", err));
}

// function handleAddCardFormSubmit(inputValues) {
//   cardSection.addItem(
//     createCard({ name: inputValues.title, link: inputValues.url })
//   );
//   addCardPopup.close();
//   addCardFormElement.reset();
//   addFormValidator.resetValidation();
// }

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
