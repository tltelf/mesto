const buttonEdit = document.querySelector('.profile__info-edit-button');
const buttonClose = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__container-form');
const nameInput = document.querySelector('.popup__container-form-field_type_name');
const jobInput = document.querySelector('.popup__container-form-field_type_job');
const title = document.querySelector('.profile__info-title');
const subtitle = document.querySelector('.profile__info-subtitle');
const buttonAdd = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup')
const photoPlacePopup = document.querySelector('.popup_photo-place');
const buttonCloseNewPlace = document.querySelector('.popup__button-close_new-place');
const formElementNewPlace = document.querySelector('.popup__container-form_new-place');
const titleInput = document.querySelector('.popup__container-form-field_new-place-title');
const linkInput = document.querySelector('.popup__container-form-field_new-place-link');
const popupImg = document.querySelector('.popup__img-photo-place');
const popupContainerTitle = document.querySelector('.popup__container-title-photo-place');
const container = document.querySelector('.elements__cards');
const cardTemplate = document.querySelector('#template').content.querySelector('.card');
const closeButtons = document.querySelectorAll('.popup__button-close');

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

// Удаление карточки

const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
}

// Генерация карточки

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = dataCard.name;

  const image = newCard.querySelector('.card__img');
  image.src = dataCard.link;
  image.alt = dataCard.name;

  newCard.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });

  image.addEventListener('click', function (evt) {
    openPopup(photoPlacePopup);
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupContainerTitle.textContent = evt.target.alt;
  });

  const btnDelete = newCard.querySelector('.card__btn-delete');
  btnDelete.addEventListener('click', handleDeleteCard)

  return newCard;
}

// Добавление карточки

const renderCard = (dataCard) => {
  container.prepend(generateCard(dataCard));
}

// Рендер карточек

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})

//  Функция открытия поп-апа

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//  Функция закрытия поп-апа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//  Обработчик отправки формы

function submitFormHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Обработчик отправки формы добавления нового места

function submitFormHandlerNewPlace (evt) {
  evt.preventDefault();
  renderCard({ 
      name: titleInput.value,
      link: linkInput.value
    });
  titleInput.value = '';
  linkInput.value = '';
  closePopup(cardPopup);
}

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

buttonEdit.addEventListener('click', () => { 
  openPopup(profilePopup)
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
});
buttonAdd.addEventListener('click', () => openPopup(cardPopup));
formElement.addEventListener('submit', submitFormHandler);
formElementNewPlace.addEventListener('submit', submitFormHandlerNewPlace);