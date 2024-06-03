class UserInfo {
  constructor({ profileName, jobElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
  }
  //("#profile-description-input
  getUserInfo() {
    // display the user data in the open form.
    return {
      title: this._profileName.textcontent,
      description: this._jobElement.textcontent,
    };
  }

  setUserInfo(userInf) {
    // takes new user data and adds it to the page
    this._profileName.textcontent = userInf.title;
    this._jobElement.textcontent = userInf.description;
  }
}

export default UserInfo;
