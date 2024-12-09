class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  }

  // Get the current user's info
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  }

  // Update profile information
  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => this.checkResponse(res));
  }

  // Update avatar
  updateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => this.checkResponse(res));
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => this.checkResponse(res));
  }

  handleDeleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  }

  // Like a card
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  }

  // Dislike a card
  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  }

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]).then(
      ([userInfo, cards]) => ({ userInfo, cards })
    );
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
export default Api;
