export const popups = Array.from(document.querySelectorAll('.popup'));

//  Функция открытия поп-апа

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

//  Функция закрытия поп-апа

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Функция, которая определяет нажатие на клавишу ESC и вызывает закрытие поп-апа

function closePopupOnEsc(event) {
  if (event.code === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    })
  }
}