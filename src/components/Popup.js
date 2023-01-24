export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', (event) => {
        this._handleEscClose(event);
      });
  }

  close() {
    this._popup.classList.remove('popup_opened');
      document.addEventListener('keydown', (event) => {
        this._handleEscClose(event);
      });
  }

  _handleEscClose(event) {
    if (event.code === 'Escape') {
      if (this._popup.classList.contains('popup_opened')) {
        this.close();
      }
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('popup') ||
        event.target.classList.contains('popup__button-close')
      ) {
          this.close();
        }
    })
  }
}