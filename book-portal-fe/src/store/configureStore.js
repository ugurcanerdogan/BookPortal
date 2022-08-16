import { applyMiddleware, compose, createStore } from "redux";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import AuthService from "../services/AuthService";
import rootReducer from "../store/rootReducer";
import { authStates } from "../store/initialValues/authStates";

const secureLs = new SecureLS();
const authService = new AuthService();

const getStateFromStorage = () => {

  const bpAuth = secureLs.get("book-portal-auth");

  // aşağıdaki let, createStore'dan kaldırıldı. duruma göre ekle.
  let stateInLocalStorage = authStates;

  if (bpAuth) {
    try {
      stateInLocalStorage = bpAuth; //refactor try-catch
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
  authService.setAuthorizationHeader(initialState);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
  store.subscribe(() => {
    updateStateInStorage(store.getState());
    authService.setAuthorizationHeader(store.getState());
  });
  return store;
};

export default configureStore;