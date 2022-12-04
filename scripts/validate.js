function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__container-form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__container-form_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__container-form-error_active');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__container-form_type_error');
  errorElement.classList.remove('popup__container-form-error_active');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__container-form-field'));
  const buttonElement = formElement.querySelector('.popup__container-form-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;                    
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__container-form-button_inactive');
  } else {
    buttonElement.classList.remove('popup__container-form-button_inactive');
  }
};

enableValidation({
  formSelector: '.popup__container-form',
  inputSelector: '.popup__container-form-field',
  submitButtonSelector: '.popup__container-form-button',
  inactiveButtonClass: 'popup__container-form-button_inactive',
  inputErrorClass: 'popup__container-form_type_error',
  errorClass: 'popup__container-form-error_active'
});