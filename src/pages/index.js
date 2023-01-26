import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { buttonEdit, nameInput, jobInput, buttonAdd, profilePopup, cardPopup, container, profileForm, newPlaceForm, dataValidation, initialCards } from '../utils/constants.js';

const popupWithImage = new PopupWithImage('.popup_photo-place');
const formValidatorProfile = new FormValidator(dataValidation, profilePopup);
const formValidatorNewPlace = new FormValidator(dataValidation, cardPopup);

const userInfo = new UserInfo({
  nameSelector: '.profile__info-title',
  infoSelector: '.profile__info-subtitle'
});

// Генерация карточек

const renderCards = new Section(
  (item) => {
    renderCards.addItem(createCardClass(item));
}, container);

// Редактирование информации в профиле

const popupWithFormProfile = new PopupWithForm(
  '.profile-popup',
  (inputValues) => {
    userInfo.setUserInfo(inputValues['name'], inputValues['job']);
    popupWithFormProfile.close();
  },
  profileForm
)

// Добавление новой карточки

const popupWithFormNewPlace = new PopupWithForm(
  '.card-popup',
  (inputValues) => {
    const initialCard = [{ 
      name: inputValues['title'],
      link: inputValues['link']
    }];
    renderCards.renderItems(initialCard);
    popupWithFormNewPlace.close();
  },
  newPlaceForm
)

function createCardClass(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open(item);
    }
  }, '#template');
  const cardElement = card.generateCard();

  return cardElement;
}

buttonEdit.addEventListener('click', () => {
  formValidatorProfile.resetError();
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser['name'];
  jobInput.value = infoUser['info'];
  popupWithFormProfile.open();
});

buttonAdd.addEventListener('click', () => {
  formValidatorNewPlace.resetError();
  popupWithFormNewPlace.open();
});

popupWithImage.setEventListeners();
formValidatorProfile.enableValidation();
formValidatorNewPlace.enableValidation();
renderCards.renderItems(initialCards);
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();