export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    this._userName = this._name.textContent;
    this._userInfo = this._info.textContent;
    this._userInfos = {name: this._userName, info: this._userInfo};

    return this._userInfos;
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info;
  }

}