const defaultState = {
  isLoggedIn: false, id: undefined, username: undefined, password: undefined, name: undefined
};

const authReducer = (state = { ...defaultState }, action) => {
  if (action.type === "logout-success") return defaultState;
  else if (action.type === "login-success") {

    let isAdmin = false;
    for (const role in action.payload.role) {
      if (action.payload.role[role] === "ROLE_ADMIN") {
        isAdmin = true;
      }
    }

    return {
      isAdmin,
      ...action.payload,
      id: action.payload.id,
      is_banned: action.payload.is_banned,
      name: action.payload.name,
      username: action.payload.sub,
      isLoggedIn: true
    };
  } else if (action.type === "update-user-success") {
    return {
      ...state,
      name: action.payload.name
    };
  } else if (action.type === "update-author-success") {
    return {
      ...state,
      name: action.payload.name
    };
  }
  return state;
};

export default authReducer;