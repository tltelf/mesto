import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup, popups} from '../utils/utils.js';

const buttonEdit = document.querySelector('.profile__info-edit-button');
const formElementProfile = document.querySelector('.popup__container-form_profile');
const nameInput = document.querySelector('.popup__container-form-field_type_name');
const jobInput = document.querySelector('.popup__container-form-field_type_job');
const title = document.querySelector('.profile__info-title');
const subtitle = document.querySelector('.profile__info-subtitle');
const buttonAdd = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup')
const formElementNewPlace = document.querySelector('.popup__container-form_new-place');
const titleInput = document.querySelector('.popup__container-form-field_new-place-title');
const linkInput = document.querySelector('.popup__container-form-field_new-place-link');
const formNewPlace = document.forms.namePopup_newPlace;
const buttonElementProfile = document.querySelector('.popup__container-form-button_profile');
const buttonElementNewPlace = document.querySelector('.popup__container-form-button_new-place');
const container = document.querySelector('.elements__cards');

const dataValidation = {
  formSelector: '.popup__container-form',
  inputSelector: '.popup__container-form-field',
  submitButtonSelector: '.popup__container-form-button',
  inactiveButtonClass: 'popup__container-form-button_inactive',
  inputErrorClass: 'popup__container-form_type_error',
  errorClass: 'popup__container-form-error_active'
};

const initialCards = [
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

// Генерация карточек

function renderCards(cards) {
  cards.forEach((item) => {
    const card = new Card(item, '#template');
    
    const cardElement = card.generateCard();
  
    container.prepend(cardElement);
  })
} 

renderCards(initialCards);

// Функция, включающая валидацию формы и удаляющая ошибки валидации при открытии формы

function turnOnValidation(popup, buttonElement) {
  const formValidator = new FormValidator(dataValidation, popup);

  formValidator.enableValidation();
  formValidator.disableButtonState(buttonElement);
  formValidator.inputList.forEach((inputElement) => {
    formValidator.hideInputError(inputElement);
  })
}

// Обработчик отправки формы

function submitFormHandlerProfile (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Обработчик отправки формы добавления нового места

function submitFormHandlerNewPlace (evt) {
  evt.preventDefault();
  renderCards([{ 
      name: titleInput.value,
      link: linkInput.value
    }]);
  formNewPlace.reset();
  closePopup(cardPopup);
}

popups.forEach((popup) => {
  popup.addEventListener('click', function (event) {
    if (
      event.target.classList.contains('popup') ||
      event.target.classList.contains('popup__button-close')
    ) {
      closePopup(popup);
    }
  })
})

buttonEdit.addEventListener('click', () => {
  turnOnValidation(profilePopup, buttonElementProfile);
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  openPopup(profilePopup);
});

buttonAdd.addEventListener('click', () => {
  turnOnValidation(cardPopup, buttonElementNewPlace);
  titleInput.value = '';
  linkInput.value = '';
  openPopup(cardPopup);
});

formElementProfile.addEventListener('submit', submitFormHandlerProfile);
formElementNewPlace.addEventListener('submit', submitFormHandlerNewPlace);