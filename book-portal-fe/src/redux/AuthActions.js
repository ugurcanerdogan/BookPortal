import { login, signUp } from "../api/apiCalls";
import jwt from "jwt-decode";

export const logoutSuccess = () => {
  return {
    type: "logout-success"
  };
};

export const loginSuccess = authState => {
  return {
    type: "login-success", payload: authState
  };
};

export const updateUserSuccess = (payload) => {
  return {
    type: "update-user-success",
    payload: {
      name: payload.name
    }
  };
};

export const updateAuthorSuccess = (payload) => {
  return {
    type: "update-author-success",
    payload: {
      name: payload.name,
      gender: payload.gender,
      email: payload.email
    }
  };
};

export const updateBookSuccess = (payload) => {
  return {
    type: "update-book-success",
    payload: {
      title: payload.title,
      year: payload.year,
      publisher: payload.publisher
    }
  };
};

export const loginHandler = (credentials) => {
  return async function(dispatch) {
    const response = await login(credentials);
    const token = response.data.access_token;
    const isBanned = response.data.is_banned;
    const name = response.data.name;

    const user = jwt(token);

    console.log(user);

    user.name = name;
    user.token = token;
    user.is_banned = isBanned;
    console.log(user.token);
    dispatch(loginSuccess(user));
    return response;

  };
};

export const signupHandler = user => {
  return async function(dispatch) {
    const response = await signUp(user);
    await dispatch(loginHandler(user));
    return response;
  };
};