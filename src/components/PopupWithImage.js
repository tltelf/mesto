import { Popup } from './Popup.js';
import { popupContainerTitle, popupImg } from '../utils/constants.js';

export class PopupWithImage extends Popup {

  open(data) {
    super.open();
    popupImg.src = data.link;
    popupImg.alt = data.name;
    popupContainerTitle.textContent = data.name;
  }

}