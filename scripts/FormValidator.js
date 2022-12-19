export class FormValidator {
  constructor(dataValidation, form) {
    this._formSelector = dataValidation.formSelector;
    this._inputSelector = dataValidation.inputSelector;
    this._submitButtonSelector = dataValidation.submitButtonSelector;
    this._inactiveButtonClass = dataValidation.inactiveButtonClass;
    this._inputErrorClass = dataValidation.inputErrorClass;
    this._errorClass = dataValidation.errorClass;
    this._form = form;
    this.inputList = Array.from(form.querySelectorAll(dataValidation.inputSelector));
    this._buttonElement = form.querySelector(dataValidation.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  disableButtonState = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this.inputList)) {
      this.disableButtonState(this._buttonElement);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', 'disabled');
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState(this.inputList, this._buttonElement);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this.inputList, this._buttonElement);
        this._checkInputValidity(inputElement);
      });
    });
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;                    
    });
  };

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form);
  }
}