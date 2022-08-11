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

export const updateSuccess = (payload) => {
  return {
    type: "update-success",
    payload : {
      name:payload.name
    }
  };
};

export const loginHandler = (auth) => {
  return async function(dispatch) {
    const response = await login(auth);

    const token = response.data.access_token;
    const userDetails = response.data.userDetails;
    const isBanned = response.data.is_banned;

    const user = jwt(token);

    console.log(user);

    user.token = token;
    user.userDetails = userDetails;
    user.is_banned = isBanned;

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