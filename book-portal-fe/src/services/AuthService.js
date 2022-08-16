import axios from "axios";

export default class AuthService {

  signUp = (body) => {
    return axios.post("http://localhost:8080/api/v1/registration", body);
  };

  login = (creds) => {
    const params = new URLSearchParams(creds);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return axios.post("http://localhost:8080/api/v1/login", params, config);
  };

  setAuthorizationHeader = (authObj) => {
    let isLoggedIn, token;
    if (authObj.auth) {
      isLoggedIn = authObj.auth.isLoggedIn;
      token = authObj.auth.token;
    }

    if (isLoggedIn) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers["Authorization"];
    }
  };
}