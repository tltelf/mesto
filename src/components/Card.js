export class Card {
  constructor({data, myId, handleCardClick, handleDelete, handleLike, handleDeleteLike}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data['owner']['_id'];
    this._cardId = data['_id'];
    this._likes = data['likes'];
    this._numberOfLikes = data['likes'].length;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
    this._templateSelector = templateSelector;
    this._myId = myId;
    this._element = this._getTemplate();
    this._likeNumber = this._element.querySelector('.card__like_number');
    this._btnLikeCard = this._element.querySelector('.card__like');
    this._btnDeleteCard = this._element.querySelector('.card__btn-delete');
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

    this._btnLikeCard.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('card__like_active')) {
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleLike(this._cardId);
      }
      this._handleLikeCard(evt);
    });

    this._btnDeleteCard.addEventListener('click', () => {
      this._handleDelete(this._cardId);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  changeNumOfLikes(num) {
    this._likeNumber.textContent = num;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkLikeOwner() {
    this._likes.forEach((item) => {
      if (item._id === this._myId) {
        this._btnLikeCard.classList.add('card__like_active');
      }
    })
  }

  _checkOwnerId() {
    if (this._ownerId !== this._myId) {
      this._btnDeleteCard.classList.add('card__btn-delete_inactive');
    }
  }

  generateCard() {
    this._checkOwnerId();
    this._checkLikeOwner();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._likeNumber.textContent = this._numberOfLikes;

    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }
}