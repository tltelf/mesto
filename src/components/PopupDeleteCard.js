import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(selector) {
    super(selector);
    this._btnDeleteCard = document.querySelector('.popup__container-form-button_delete-card');
  }

  open(handleDelete) {
    super.open();
    this._handleDelete = handleDelete;
    this._btnDeleteCard.addEventListener('click', this._handleDelete);
  }

  close() {
    super.close();
    this._btnDeleteCard.removeEventListener('click', this._handleDelete);
  }

}