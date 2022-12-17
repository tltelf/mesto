import {openPopup} from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });

    this._element.querySelector('.card__btn-delete').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });

    this._element.querySelector('.card__img').addEventListener('click', (evt) => {
      this._handleOpenImage(evt);
    });
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  _handleOpenImage(evt) {
    const popupContainerTitle = document.querySelector('.popup__container-title-photo-place');
    const photoPlacePopup = document.querySelector('.popup_photo-place');
    const popupImg = document.querySelector('.popup__img-photo-place');
    openPopup(photoPlacePopup);
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupContainerTitle.textContent = evt.target.alt;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;

    return this._element;
  }
}