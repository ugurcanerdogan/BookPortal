import React from "react";
import { Grid } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Categories from "../layouts/Categories";

import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";

import BookList from "../pages/Book/BookList";
import BookDetail from "../pages/Book/BookDetail";
import BookAdd from "../pages/Book/BookAdd";
import BookUpdate from "../pages/Book/BookUpdate";

import UserList from "../pages/User/UserList";
import UserDetail from "../pages/User/UserDetail";
import UserAdd from "../pages/User/UserAdd";
import UserUpdate from "../pages/User/UserUpdate";

import AuthorList from "../pages/Author/AuthorList";
import AuthorDetail from "../pages/Author/AuthorDetail";
import AuthorAdd from "../pages/Author/AuthorAdd";
import AuthorUpdate from "../pages/Author/AuthorUpdate";


const Dashboard = () => {

  const { isLoggedIn } = useSelector(state => state.auth);

  let loggedInPart = (<div style={{ marginTop: "8em" }}>
    <Grid relaxed="very">
      <Grid.Row>
        <Grid.Column width={4}>
          <Categories />
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <Route exact path="/" component={BookList} />
            <Route exact path="/books" component={BookList} />
            <Route path="/books/search/:searchItem" component={BookList} />
            <Route path="/books/add" component={BookAdd} />
            <Route path="/books/view/:isbn" component={BookDetail} />
            <Route path="/books/edit/:isbn" component={BookUpdate} />

            <Route exact path="/users" component={UserList} />
            <Route path="/users/search/:searchItem" component={UserList} />
            <Route path="/users/add" component={UserAdd} />
            <Route path="/users/view/:username" component={UserDetail} />
            <Route path="/users/edit/:username" component={UserUpdate} />

            <Route exact path="/authors" component={AuthorList} />
            <Route path="/authors/search/:searchItem" component={AuthorList} />
            <Route path="/authors/add" component={AuthorAdd} />
            <Route path="/authors/view/:name" component={AuthorDetail} />
            <Route path="/authors/edit/:name" component={AuthorUpdate} />

          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>);

  let loggedOutPart = (<div style={{ marginTop: "8em" }}>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/signup" component={SignUpPage} />
  </div>);

  if (isLoggedIn) {
    return loggedInPart;
  } else {
    return loggedOutPart;
  }
};

export default Dashboard;