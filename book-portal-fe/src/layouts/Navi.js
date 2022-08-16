import React, { useEffect, useState } from "react";
import { Container, Dropdown, Flag, Image, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../store/actions/authActions";
import { useTranslation } from "react-i18next";
import portalLogo from "../assets/navbarLogo.png";
import SignedOut from "../layouts/SignedOut";
import SignedIn from "../layouts/SignedIn";

const Navi = () => {

  const { isLoggedIn, isAdmin } = useSelector(state => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  const history = useHistory();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  function handleSignOut(params) {
    setIsAuthenticated(false);
    dispatch(logoutSuccess());
    history.push("/");
  }

  function handleSignIn(params) {
    setIsAuthenticated(true);
  }

  const onChangeLanguage = language => {
    i18n.changeLanguage(language);

  };

  // linkler add compa gidecek
  let panel = (
    <Dropdown item text="Admin Panel">
      <Dropdown.Menu>
        <Link to={`/books/add`}>
          <Dropdown.Item text="Add Book" icon="add" />
        </Link>
        <Link to={`/users/add`}>
          <Dropdown.Item text="Add User" icon="add" />
        </Link>
        <Link to={`/authors/add`}>
          <Dropdown.Item text="Add Author" icon="add" />
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (<div>
    <Menu fixed="top">
      <Container>

        <Image size="tiny" src={portalLogo} />

        {/*<Menu.Item as={NavLink} to="/books" name="Books" />*/}

        <Menu.Menu position="right">
          {isAdmin && panel}
          <Dropdown item text="Language">
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onChangeLanguage("tr")}><Flag name="tr" />Turkish</Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeLanguage("en")}><Flag name="gb" />English</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}
        </Menu.Menu>
      </Container>
    </Menu>
  </div>);
};

export default Navi;