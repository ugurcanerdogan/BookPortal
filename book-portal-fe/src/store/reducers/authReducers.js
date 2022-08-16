import { authStates } from "../../store/initialValues/authStates";

const authReducers = (state = { ...authStates }, action) => {

  switch (action.type) {

    case "logout-success":
      return authStates;

    case "refresh-user":
      console.log(action.payload);
      return {
        ...state,
        name: action.payload,
        isLoggedIn: true
      };

    case "login-success":
      let isAdmin = false;
      for (const role in action.payload.role) {
        if (action.payload.role[role] === "ROLE_ADMIN") {
          isAdmin = true;
        }
      }

      let returnObj = {
        isAdmin,
        ...action.payload,
        id: action.payload.id,
        is_banned: action.payload.is_banned,
        name: action.payload.name,
        username: action.payload.sub,
        isLoggedIn: true
      };

      return returnObj;

    default:
      return state;
  }
};

export default authReducers;