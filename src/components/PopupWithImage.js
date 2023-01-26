import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
    this._popupContainerTitle = document.querySelector('.popup__container-title-photo-place');
    this._popupImg = document.querySelector('.popup__img-photo-place');
  }

  open(data) {
    super.open();
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupContainerTitle.textContent = data.name;
  }

}