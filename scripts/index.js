import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

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
const popups = Array.from(document.querySelectorAll('.popup'));
const formNewPlace = document.forms.namePopup_newPlace;
const buttonElementNewPlace = document.querySelector('.popup__container-form-button_new-place');
const dataValidation = {
  formSelector: '.popup__container-form',
  inputSelector: '.popup__container-form-field',
  submitButtonSelector: '.popup__container-form-button',
  inactiveButtonClass: 'popup__container-form-button_inactive',
  inputErrorClass: 'popup__container-form_type_error',
  errorClass: 'popup__container-form-error_active'
};
const formList = Array.from(document.querySelectorAll(dataValidation.formSelector));
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

function renderCard(cards) {
  cards.forEach((item) => {
    const card = new Card(item, '#template');
  
    const cardElement = card.generateCard();
  
    document.querySelector('.elements__cards').prepend(cardElement);
  })
} 

renderCard(initialCards);

// Функция, отключающая кнопку сабмита

export function disableButtonState(buttonElement) {
  buttonElement.classList.add('popup__container-form-button_inactive');
  buttonElement.setAttribute('disabled', 'disabled');
}

// Устанавливаем валидацию на каждую отдельную форму

formList.forEach((formElement) => {
  const formValidator = new FormValidator(dataValidation, formElement);
  
  formValidator.enableValidation();
})

//  Функция открытия поп-апа

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

//  Функция закрытия поп-апа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Функция, которая определяет нажатие на клавишу ESC и вызывает закрытие поп-апа

function closePopupOnEsc(event) {
  if (event.code === 'Escape') {
    popups.forEach((popup) => {
      closePopup(popup);
    })
  }
}

//  Обработчик отправки формы

function submitFormHandlerProfile (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Обработчик отправки формы добавления нового места

function submitFormHandlerNewPlace (evt) {
  evt.preventDefault();
  renderCard([{ 
      name: titleInput.value,
      link: linkInput.value
    }]);
  formNewPlace.reset();
  disableButtonState(buttonElementNewPlace);
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
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  openPopup(profilePopup);
});

buttonAdd.addEventListener('click', () => {
  openPopup(cardPopup);
});

formElementProfile.addEventListener('submit', submitFormHandlerProfile);
formElementNewPlace.addEventListener('submit', submitFormHandlerNewPlace);