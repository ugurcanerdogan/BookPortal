import React, { useEffect, useState } from "react";
import { Container, Dropdown, Flag, Image, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../store/actions/authActions";
import { useTranslation } from "react-i18next";
import portalLogo from "../assets/navbarLogo.png";
import SignedOut from "../layouts/SignedOut";
import SignedIn from "../layouts/SignedIn";
import SearchBar from "../layouts/SearchBar";

const Navi = () => {

  const { isLoggedIn, isAdmin } = useSelector(state => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  const history = useHistory();
  const { push } = history;
  const dispatch = useDispatch();

  function handleSignOut(params) {
    setIsAuthenticated(false);
    dispatch(logoutSuccess());
    push("/");
  }

  function handleSignIn(params) {
    setIsAuthenticated(true);
  }

  const onChangeLanguage = language => {
    i18n.changeLanguage(language);

  };

  let panel = (
    <Dropdown item text={t("Admin Panel")}>
      <Dropdown.Menu>
        <Link to={`/books/add`}>
          <Dropdown.Item text={t("Add Book")} icon="add" />
        </Link>
        <Link to={`/users/add`}>
          <Dropdown.Item text={t("Add User")} icon="add" />
        </Link>
        <Link to={`/authors/add`}>
          <Dropdown.Item text={t("Add Author")} icon="add" />
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (<div>
    <Menu fixed="top">
      <Container>
        <Image size="tiny" src={portalLogo} />
        {isLoggedIn && <SearchBar />}
        <Menu.Menu position="right">
          {isAdmin && panel}
          <Dropdown item text={t("Language")}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onChangeLanguage("tr")}><Flag name="tr" />{t("Turkish")}</Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeLanguage("en")}><Flag name="gb" />{t("English")}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}
        </Menu.Menu>
      </Container>
    </Menu>
  </div>);
};

export default Navi;