class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }

  // Get the current user's info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }

  // Update profile information
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
        alert("Something went wrong. Please try again later.");
      });
  }

  // Update avatar
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }

  handleDeleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }

  // Like a card
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }

  // Dislike a card
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userInfo, cards]) => ({ userInfo, cards }))
      .catch((err) => {
        console.error("Request failed:", err);
        alert("Unable to load user data or cards. Please try again later.");
      });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
export default Api;
