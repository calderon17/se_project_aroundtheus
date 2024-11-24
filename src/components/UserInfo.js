class UserInfo {
  constructor({ profileName, jobElement, avatarImage }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
    this._avatarImage = document.querySelector(avatarImage);
  }
  getUserInfo() {
    return {
      title: this._profileName.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(userInf) {
    this._profileName.textContent = userInf.name;
    this._jobElement.textContent = userInf.description;
  }

  updateAvatarImage(image) {
    if (image.avatar) {
      this._avatarImage.src = image.avatar;
    }
  }
}

export default UserInfo;
