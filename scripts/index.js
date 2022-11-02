let editButton = document.querySelector('.profile__info-editButton');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__buttonClose');
let formElement = document.querySelector('.popup__container-form');
let nameInput = document.querySelector('.popup__container-formField_name');
let jobInput = document.querySelector('.popup__container-formField_job');
let title = document.querySelector('.profile__info-title');
let subtitle = document.querySelector('.profile__info-subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

