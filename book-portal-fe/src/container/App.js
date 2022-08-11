import React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";


const App = () => {

  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn
  }));

  return (<div>
    <HashRouter>
      <TopBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {!isLoggedIn && <Route path="/login" component={LoginPage} />}
        <Route path="/signup" component={UserSignupPage} />
        <Route path="/users/:username" component={UserPage} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
    <LanguageSelector />
  </div>);

};

export default App;