import AuthService from "../../services/AuthService";
import jwt from "jwt-decode";

const authService = new AuthService();

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

export const loginHandler = (credentials) => {
  return async function(dispatch) {

    const response = await authService.login(credentials);
    const token = response.data.access_token;
    const isBanned = response.data.banned;
    const name = response.data.name;
    const id = response.data.id;

    const user = jwt(token);

    user.id = id;
    user.name = name;
    user.token = token;
    user.is_banned = isBanned;
    dispatch(loginSuccess(user));
    return response;
  };
};

export const signupHandler = user => {
  return async function(dispatch) {
    const response = await authService.signUp(user);
    await dispatch(loginHandler(user));
    return response;
  };
};

export const refreshUser = value => {
  console.log(value);
  return {
    type: "refresh-user", payload: value
  };
};

export const refreshUserHandler = (value) => {
  return function(dispatch) {
    console.log(value);
    dispatch(refreshUser(value));
    return value;
  };
};

