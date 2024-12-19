class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { "Content-type": "application/json" },
    };

    const token = localStorage.getItem("jwt-token");
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  register(email, password) {
    return this._makeRequest("/signup", "POST", { email, password });
  }

  login(email, password) {
    return this._makeRequest("/signin", "POST", { email, password });
  }
}

const auth = new Api({
  baseUrl: "https://api.lis.streetwidecollectionservices.com",
});

export default auth;
