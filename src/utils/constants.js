const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const avatarEditModal = document.querySelector("#avatar-edit-modal");
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

//forms
const profileEditForm = profileEditModal.querySelector("#modal-form");
const avatarFormElement = avatarEditModal.querySelector("#modal-form");
const addCardFormElement = addCardModal.querySelector("#modal-form");

//cards
const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-url-input");
const cardListEl = document.querySelector(".cards__list");
const cardImageEl = document.querySelector(".cards__list");
const template =
  document.querySelector("#card-template").content.firstElementChild;

// image preview modal
const previewImageModal = document.querySelector("#preview-image-modal");
const modalImageElement = previewImageModal.querySelector(".modal__img");
const imageModalcaption = previewImageModal.querySelector(".modal__caption");
const preImgModalCloseButton = previewImageModal.querySelector("#modal-close");

export {
  profileEditButton,
  profileEditModal,
  addCardModal,
  avatarEditModal,
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
  cardImageEl,
  template,
  modalImageElement,
  imageModalcaption,
  preImgModalCloseButton,
  avatarFormElement,
};

// export const cardSelector = "#card-teamplte";
export const cardSelector = "#card-template";

export const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
