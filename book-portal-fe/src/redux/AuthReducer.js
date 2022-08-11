const defaultState = {
  isLoggedIn: false,
  username: undefined,
  password: undefined,
  name: undefined
};

const authReducer = (state = { ...defaultState }, action) => {
  if (action.type === "logout-success")
    return defaultState;
  else if (action.type === "login-success") {
    return {
      ...action.payload,
      name: action.payload.userDetails.name,
      username: action.payload.userDetails.username,
      isLoggedIn: true
    };
  }
  return state;
};

export default authReducer;