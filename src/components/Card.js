export class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__img');
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

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  generateCard() {
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;

    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }
}