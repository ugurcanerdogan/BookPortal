import axios from "axios";

export default class AuthService {

  signUp = (body) => {
    return axios.post("/api/v1/users/registration", body);
  };

  login = (creds) => {
    return axios.post("/api/v1/login", creds);
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