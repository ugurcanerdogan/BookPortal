import {login} from "./api/apiCalls"
import jwt from 'jwt-decode'

export const logoutSuccess = () => {
  return {
    type: "logout-success"
  };
}

export const loginSuccess  = (auth) => {
  let val = {}
  for (const element of auth.role) {
    if(element === "ROLE_USER"){
      val = {
        type: "login-success",
        payload: auth,
      };
    }
  }
  return val;
}

export const loginHandler =  async (auth) => {
  const response = await login(auth);
  const token = response.data.access_token;
  const userDetails = response.data.userDetails;
  const isBanned = response.data.is_banned;
  const user = jwt(token);
  console.log(user);
  user.token = token;
  user.userDetails = userDetails;
  user.is_banned = isBanned;
  loginSuccess(user);
  return response;

}