import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler, formSelector, button) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this._form = formSelector;
    this._inputList = document.querySelectorAll('.popup__container-form-field');
    this._btn = button;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  renderLoading(text) {
    this._btn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}