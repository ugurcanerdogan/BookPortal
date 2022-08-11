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
    password: undefined,
    name: undefined
  };
  if (bpAuth) {
    stateInLocalStorage = bpAuth;
  }
  return stateInLocalStorage;
};

const updateStateInStorage = newState => {
  secureLs.set("book-portal-auth", newState);
};

const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));

  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });
  return store;
};

export default configureStore;
