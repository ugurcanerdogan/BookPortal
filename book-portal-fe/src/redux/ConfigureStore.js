import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import { setAuthorizationHeader } from "../api/apiCalls";

const secureLs = new SecureLS();


const getStateFromStorage = () => {
  const bpAuth = secureLs.get("book-portal-auth");
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    password: undefined
  };
  if (bpAuth) {
    try {
      stateInLocalStorage = bpAuth;
    } catch (error) {
    }
  }
  return stateInLocalStorage;
};

const updateStateInStorage = newState => {
  secureLs.set("book-portal-auth", newState);
};

const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });
  return store;
};

export default configureStore;
