export const buttonEdit = document.querySelector('.profile__info-edit-button');
export const nameInput = document.querySelector('.popup__container-form-field_type_name');
export const jobInput = document.querySelector('.popup__container-form-field_type_job');
export const buttonAdd = document.querySelector('.profile__add-button');
export const profilePopup = document.querySelector('.profile-popup');
export const cardPopup = document.querySelector('.card-popup')
export const container = document.querySelector('.elements__cards');
export const profileForm = document.forms.profileForm;
export const newPlaceForm = document.forms.newPlaceForm;

export const dataValidation = {
  formSelector: '.popup__container-form',
  inputSelector: '.popup__container-form-field',
  submitButtonSelector: '.popup__container-form-button',
  inactiveButtonClass: 'popup__container-form-button_inactive',
  inputErrorClass: 'popup__container-form_type_error',
  errorClass: 'popup__container-form-error_active'
};

export const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];