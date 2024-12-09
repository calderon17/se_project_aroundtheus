import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";

//________

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/Popupwithform.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirmDelete from "../components/PopupConfrimDelete.js";
import Api from "../components/Api.js";

// //_______

//Project 9//

//-------------------------------------------------------------------
//

import {
  // initialCards,
  // profileEditModal,
  // profileEditModal,
  // addCardModal,
  // avatarEditModal,
  // profileModalCloseButton,
  // profileTitle,
  // profileDescription,
  // addCardModalCloseButton,
  // cardTitleInput,
  // cardUrlInput,
  // cardListEl,
  // cardImageEl,
  // Template,
  // modalImageElement,
  // imageModalcaption,
  // preImgModalCloseButton,
  addNewCardButton,
  profileEditForm,
  addCardFormElement,
  profileTitleInput,
  profileDescriptionInput,
  profileEditButton,
  cardSelector,
  settings,
  avatarFormElement,
  profileEditSaveButton,
  avatarSaveButton,
  addCardSaveButton,
} from "../utils/constants.js";

const cardSection = new Section(
  {
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
const avatarPopup = new PopupWithForm("#avatar-edit-modal", handleAvatarSubmit);
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
avatarPopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage("#preview-image-modal"); //should be good
imagePreviewPopup.setEventListeners();

const userInfoInstance = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
  avatarImage: ".profile__image",
});

// Instantiating  PopupConfirmDelete project 9

const confirmDelete = new PopupConfirmDelete("#delete-image-modal");

confirmDelete.setEventListeners();

//Project 9 /////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c801e776-9008-430b-a7ca-bcf7d2aaaf7f", // my special token
    "Content-Type": "application/json",
  },
});

// api
//   .getInitialCards()
//   .then((data) => {
//     cardSection.renderItems(data);
//     console.log(data);
//     // console.log("Fetched Cards:", data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

api
  .getUserInfoAndCards()
  .then(({ userInfo, cards }) => {
    userInfoInstance.setUserInfo({
      name: userInfo.name,
      description: userInfo.about,
    });
    userInfoInstance.updateAvatarImage({ avatar: userInfo.avatar });
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error("Failed to load user information or cards:", err);
    alert("Unable to load user data or cards. Please try again later.");
  });

// // Open avatar edit popup
const avatarEditButton = document.querySelector(".profile__edit-avatar-button");
avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});

// // Function to handle avatar update
function handleAvatarSubmit(inputData, saveButton) {
  renderSaving(true, saveButton);
  api
    .updateUserAvatar({ avatar: inputData.avatar })
    .then((userData) => {
      userInfoInstance.updateAvatarImage({ avatar: userData.avatar });
      avatarPopup.close();
      avatarFormValidator.resetValidation();
      avatarFormElement.reset();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
      alert("Failed to change avatar image. Please try again.");
    })
    .finally(() => {
      renderSaving(false, saveButton);
    });
}

function renderSaving(isLoading, buttonElement, defaultText = "Save") {
  if (isLoading) {
    buttonElement.textContent = "Saving...";
  } else {
    buttonElement.textContent = defaultText;
  }
}

//////////////////////////////////// end of project 9 ////////////////////////////////////////////

// //----------------------------------------------------------------------------------------
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
    (cardId, card) => {
      handleCardLike(cardId, card);
    }
  );
  return card.getview();
}

// function createCard(item) {
//   const card = new Card(
//     item,
//     cardSelector,
//     handleImagePreview,
//     handleCardLike,
//     (cardId, card) => {
//       deleteCardModal(cardId, card);
//     },
//     (cardId, isLiked, cardElement) => {
//       handleLikeIcon(cardId, isLiked, cardElement, card);
//     }
//   );
//   return card.getview();
// }

function handleCardLike(card) {
  if (!card.isLiked) {
    api
      .likeCard(card.id)
      .then((data) => {
        console.log(data);
        card.updateLike(true);
      })
      .catch((err) => console.error("Error adding like to card:", err));
  } else {
    api
      .dislikeCard(card.id)
      .then((data) => {
        card.updateLike(false);
        console.log(data);
      })
      .catch((err) => console.error("Error removing like from card:", err));
  }
}

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);
const avatarFormValidator = new FormValidator(settings, avatarFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

function handleProfileEditSubmit(inputData, saveButton) {
  renderSaving(true, saveButton);

  api
    .updateUserInfo({
      name: inputData.name,
      about: inputData.description,
    })
    .then(() => {
      userInfoInstance.setUserInfo(inputData);
      editProfilePopup.close();
      profileEditForm.reset();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    })
    .finally(() => {
      renderSaving(false, saveButton);
    });
}

function handleAddCardFormSubmit(inputValues, saveButton) {
  renderSaving(true, saveButton);

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
    .catch((err) => {
      console.error("Error adding card:", err);
      alert("Failed to add the card. Please try again.");
    })
    .finally(() => {
      renderSaving(false, saveButton);
    });
}

//----------------------------------------------------------------------------------------
//                                 Events listeners
//----------------------------------------------------------------------------------------

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfoInstance.getUserInfo();
  profileTitleInput.value = currentUserInfo.title;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
