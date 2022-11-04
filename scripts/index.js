let buttonEdit = document.querySelector('.profile__info-edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__container-form');
let nameInput = document.querySelector('.popup__container-form-field_type_name');
let jobInput = document.querySelector('.popup__container-form-field_type_job');
let title = document.querySelector('.profile__info-title');
let subtitle = document.querySelector('.profile__info-subtitle');

//  Функция открытия поп-апа
function openPopup() {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  popup.classList.add('popup_opened');
}

//  Функция закрытия поп-апа
function closePopup() {
  popup.classList.remove('popup_opened');
}

//  Обработчик отправки формы
function submitFormHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup();
}

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitFormHandler);

