import './index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { buttonEdit, nameInput, jobInput, buttonAdd, profilePopup, cardPopup, buttonElementProfile, buttonElementNewPlace, container, dataValidation, initialCards } from './utils/constants.js';

const popupWithImage = new PopupWithImage('.popup_photo-place');

// Генерация карточек

const renderCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
        popupWithImage.setEventListeners();
      }
    }, '#template');
    const cardElement = card.generateCard();
    renderCards.addItem(cardElement);
  }
}, container);

// Редактирование информации в профиле

const popupWithFormProfile = new PopupWithForm(
  '.profile-popup',
  (inputValues) => {
    const userInfo = new UserInfo({
      nameSelector: '.profile__info-title',
      infoSelector: '.profile__info-subtitle'
    });
    userInfo.setUserInfo(inputValues['name'], inputValues['job']);
    popupWithFormProfile.close();
  }
)

// Добавление новой карточки

const popupWithFormNewPlace = new PopupWithForm(
  '.card-popup',
  (inputValues) => {
    const initialCard = [{ 
      name: inputValues['title'],
      link: inputValues['link']
    }];
    const renderCard = new Section({
      items: initialCard,
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleCardClick: () => {
            popupWithImage.open(item);
            popupWithImage.setEventListeners();
          }
        }, '#template');
        const cardElement = card.generateCard();
        renderCard.addItem(cardElement);
      }
    }, container);
    renderCard.renderItems();
    popupWithFormNewPlace.close();
  }
)

// Функция, включающая валидацию формы и удаляющая ошибки валидации при открытии формы

function turnOnValidation(popup, buttonElement) {
  const formValidator = new FormValidator(dataValidation, popup);
  formValidator.enableValidation();
  formValidator.disableButtonState(buttonElement);
  formValidator.inputList.forEach((inputElement) => {
    formValidator.hideInputError(inputElement);
  })
}

buttonEdit.addEventListener('click', () => {
  turnOnValidation(profilePopup, buttonElementProfile);
  const userInfo = new UserInfo({
    nameSelector: '.profile__info-title',
    infoSelector: '.profile__info-subtitle'
  });
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser['name'];
  jobInput.value = infoUser['info'];
  popupWithFormProfile.open();
});

buttonAdd.addEventListener('click', () => {
  turnOnValidation(cardPopup, buttonElementNewPlace);
  popupWithFormNewPlace.open();
});

renderCards.renderItems();
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();