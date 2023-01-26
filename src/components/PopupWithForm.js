import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler, formSelector) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this._form = formSelector;
  }

  _getInputValues() {
    this._inputList = document.querySelectorAll('.popup__container-form-field');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
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