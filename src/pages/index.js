import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { buttonEdit, nameInput, jobInput, buttonAdd, profilePopup, cardPopup, avatarPopup, buttonEditAvatar, avatar, myId, container, btnFormNewPlace, btnFormProfile, btnFormAvatar, btnTextNewPlace, btnTextNewPlaceLoading, btnText, btnTextLoading, profileForm, newPlaceForm, avatarForm, dataValidation } from '../utils/constants.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

const popupWithImage = new PopupWithImage('.popup_photo-place');
const popupDeleteCard = new PopupDeleteCard('.delete-card-popup');
const formValidatorProfile = new FormValidator(dataValidation, profilePopup);
const formValidatorNewPlace = new FormValidator(dataValidation, cardPopup);
const formValidatorAvatar = new FormValidator(dataValidation, avatarPopup);

const userInfo = new UserInfo({
  nameSelector: '.profile__info-title',
  infoSelector: '.profile__info-subtitle',
  avatarSelector: '.profile__avatar'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '779c3ebd-8504-4175-be99-baca153c2683',
    'Content-Type': 'application/json'
  }
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
    renderLoading(true, btnFormProfile, btnTextLoading, btnText);
    api.setUserInfo({ name: inputValues['name'], about: inputValues['job'] })
    .then((data) => {
      userInfo.setUserInfo(inputValues['name'], inputValues['job'], data['avatar']);
    })
    .finally(() => {
      renderLoading(false, btnFormProfile, btnTextLoading, btnText);
      popupWithFormProfile.close();
    })
  },
  profileForm
)

// Редактирование аватара

const popupWithFormAvatar = new PopupWithForm(
  '.avatar-popup',
  (inputValues) => {
    renderLoading(true, btnFormAvatar, btnTextLoading, btnText);
    api.updateAvatar({ avatar: inputValues['avatar']})
    .then((data) => {
      avatar.src = data['avatar'];
    })
    .finally(() => {
      renderLoading(false, btnFormAvatar, btnTextLoading, btnText);
      popupWithFormAvatar.close();
    })
  },
  avatarForm
)

// Добавление новой карточки

const popupWithFormNewPlace = new PopupWithForm(
  '.card-popup',
  (inputValues) => {
    renderLoading(true, btnFormNewPlace, btnTextNewPlaceLoading, btnTextNewPlace);
    api.renderCard({ name: inputValues['title'], link: inputValues['link'] })
    .then((data) => {
      renderCards.renderItems([data]);
    })
    .finally(() => {
      renderLoading(false, btnFormNewPlace, btnTextNewPlaceLoading, btnTextNewPlace);
      popupWithFormNewPlace.close();
    })
  },
  newPlaceForm
)

function createCardClass(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open(item);
    },
    handleDelete: (id) => {
      popupDeleteCard.open(() => {
        api.deleteCard(id).then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
      });
    },
    handleLike: (id) => {
      api.likeCard(id).then((item) => {
        card.changeNumOfLikes(item['likes'].length);
      })
    },
    handleDeleteLike: (id) => {
      api.deleteLikeCard(id).then((item) => {
        card.changeNumOfLikes(item['likes'].length);
      })
    }
  }, '#template', myId);
  const cardElement = card.generateCard();

  return cardElement;
}

function renderLoading(isLoading, btn, textLoading, text) {
  if (isLoading) {
    btn.textContent = textLoading;
  } else {
    btn.textContent = text;
  }
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

buttonEditAvatar.addEventListener('click', () => {
  formValidatorAvatar.resetError();
  popupWithFormAvatar.open();
})

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data['name'], data['about'], data['avatar']);
});

api.getInitialCards().then((data) => {
  renderCards.renderItems(data);
})

popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
formValidatorProfile.enableValidation();
formValidatorNewPlace.enableValidation();
formValidatorAvatar.enableValidation();
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();
popupWithFormAvatar.setEventListeners();