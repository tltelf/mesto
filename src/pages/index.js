import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { buttonEdit, nameInput, jobInput, buttonAdd, profilePopup, cardPopup, avatarPopup, buttonEditAvatar, container, btnFormNewPlace, btnFormProfile, btnFormAvatar, btnTextNewPlace, btnTextNewPlaceLoading, btnText, btnTextLoading, profileForm, newPlaceForm, avatarForm, dataValidation } from '../utils/constants.js';
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
    popupWithFormProfile.renderLoading(btnTextLoading);
    api.setUserInfo({ name: inputValues['name'], about: inputValues['job'] })
    .then(() => {
      userInfo.setUserInfo(inputValues['name'], inputValues['job']);
      popupWithFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormProfile.renderLoading(btnText);
    })
  },
  profileForm, btnFormProfile
)

// Редактирование аватара

const popupWithFormAvatar = new PopupWithForm(
  '.avatar-popup',
  (inputValues) => {
    popupWithFormAvatar.renderLoading(btnTextLoading);
    api.updateAvatar({ avatar: inputValues['avatar']})
    .then((data) => {
      userInfo.setUserAvatar(data['avatar']);
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(btnText);
    })
  },
  avatarForm, btnFormAvatar
)

// Добавление новой карточки

const popupWithFormNewPlace = new PopupWithForm(
  '.card-popup',
  (inputValues) => {
    popupWithFormNewPlace.renderLoading(btnTextNewPlaceLoading);
    api.renderCard({ name: inputValues['title'], link: inputValues['link'] })
    .then((data) => {
      renderCards.renderItems([data]);
      popupWithFormNewPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormNewPlace.renderLoading(btnTextNewPlace);
    })
  },
  newPlaceForm, btnFormNewPlace
)

let myId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([info, data]) => {
  myId = info['_id'];
  userInfo.setUserInfo(info['name'], info['about']);
  userInfo.setUserAvatar(info['avatar']);
  renderCards.renderItems(data);
})

function createCardClass(item) {
  const card = new Card({
    data: item,
    myId: myId,
    handleCardClick: () => {
      popupWithImage.open(item);
    },
    handleDelete: (id) => {
      popupDeleteCard.open(() => {
        api.deleteCard(id).then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
      });
    },
    handleLike: (id) => {
      api.likeCard(id).then((item) => {
        card.changeNumOfLikes(item['likes'].length);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    handleDeleteLike: (id) => {
      api.deleteLikeCard(id).then((item) => {
        card.changeNumOfLikes(item['likes'].length);
      })
      .catch((err) => {
        console.log(err);
      })
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

buttonEditAvatar.addEventListener('click', () => {
  formValidatorAvatar.resetError();
  popupWithFormAvatar.open();
})

popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
formValidatorProfile.enableValidation();
formValidatorNewPlace.enableValidation();
formValidatorAvatar.enableValidation();
popupWithFormProfile.setEventListeners();
popupWithFormNewPlace.setEventListeners();
popupWithFormAvatar.setEventListeners();