class UserInfo {
  constructor({ profileName, jobElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
  }
  //("#profile-description-input
  getUserInfo() {
    // display the user data in the open form.
    return {
      title: this._profileName.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(userInf) {
    // takes new user data and adds it to the page

    this._profileName.textContent = userInf.title;
    this._jobElement.textContent = userInf.description;
  }
}

console.log("manu");

export default UserInfo;
