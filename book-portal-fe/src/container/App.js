import React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import BookPage from "../pages/BookPage";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";
import UserList from "../components/User/UserList";
import AuthorList from "../components/Author/AuthorList";
import AuthorPage from "../pages/AuthorPage";


const App = () => {

  const { isLoggedIn, isAdmin } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn, isAdmin: store.isAdmin
  }));


  return (<div>
    <HashRouter>
      <TopBar isAdmin={isAdmin} />
      <div>
        <Switch>
          {!isLoggedIn && <Route path="/login" component={LoginPage} />}
          <Route exact path="/users/" component={UserList} />
          <Route exact path="/authors/" component={AuthorList} />
          <Route exact path="/" component={HomePage} />
          <Route path="/users/:username" component={UserPage} />
          <Route path="/books/:isbn" component={BookPage} />
          <Route path="/authors/:name" component={AuthorPage} />
          <Route path="/signup" component={UserSignupPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </HashRouter>
    <LanguageSelector />
  </div>);

};

export default App;