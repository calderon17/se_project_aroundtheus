class UserInfo {
  constructor({ profileName, jobElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
  }
  getUserInfo() {
    return {
      title: this._profileName.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(userInf) {
    this._profileName.textContent = userInf.title;
    this._jobElement.textContent = userInf.description;
  }
}

export default UserInfo;
