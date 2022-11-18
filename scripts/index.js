const buttonEdit = document.querySelector('.profile__info-edit-button');
const buttonClose = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__container-form');
let nameInput = document.querySelector('.popup__container-form-field_type_name');
let jobInput = document.querySelector('.popup__container-form-field_type_job');
let title = document.querySelector('.profile__info-title');
let subtitle = document.querySelector('.profile__info-subtitle');
const buttonAdd = document.querySelector('.profile__add-button');
let popups = document.querySelectorAll('.popup');
const buttonCloseNewPlace = document.querySelector('.popup__button-close_new-place');
const formElementNewPlace = document.querySelector('.popup__container-form_new-place');
let titleInput = document.querySelector('.popup__container-form-field_new-place-title');
let linkInput = document.querySelector('.popup__container-form-field_new-place-link');
let popupImg = document.querySelector('.popup__img_photo-place');
let popupContainerTitle = document.querySelector('.popup__container-title-photo-place');
const container = document.querySelector('.elements__cards');
const cardTemplate = document.querySelector('#template').content.querySelector('.card');

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
    openPopup(2);
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

function openPopup(index) {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  popups[index].classList.toggle('popup_opened');
}

//  Функция закрытия поп-апа

function closePopup(index) {
  popups[index].classList.toggle('popup_opened');
}

//  Обработчик отправки формы

function submitFormHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup(0);
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
  closePopup(1);
}

buttonEdit.addEventListener('click', ()=> openPopup(0));
buttonClose.addEventListener('click', ()=> closePopup(0));
buttonAdd.addEventListener('click', ()=> openPopup(1));
buttonCloseNewPlace.addEventListener('click', ()=> closePopup(1));
document.querySelector('.popup__button-close_photo-place').addEventListener('click', ()=> closePopup(2));
formElement.addEventListener('submit', submitFormHandler);
formElementNewPlace.addEventListener('submit', submitFormHandlerNewPlace);