import React, { useEffect, useState } from "react";
import {
  Form,
  Container,
  Dropdown,
  Flag,
  Image,
  Menu, Icon
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../store/actions/authActions";
import { useTranslation } from "react-i18next";
import portalLogo from "../assets/navbarLogo.png";
import SignedOut from "../layouts/SignedOut";
import SignedIn from "../layouts/SignedIn";

const Navi = (props) => {

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
  let initialValues = {}


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

  const okSubmit2 = (formValue) => {
    console.log(formValue)
    switch (formValue) {
      case "books":
        push("/books/"+formValue)
        break
      case "users":
        push("/users/"+formValue)
        break
      case "authors":
        push("/authors/"+formValue)
        break
      default:
        return;
    }
  }

  const options =  [
    { key: 'Books', text: 'Books', value: 'books' },
    { key: 'Users', text: 'Users', value: 'users' },
    { key: 'Authors', text: 'Authors', value: 'authors' },
  ]

  const onSubmit = ()=>{

  }

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
        <div style={{marginLeft:"10em", marginTop:"1em"}}>
          <Form className="ui form" onSubmit={onSubmit}>
            <Form.Group widths='equal'>
              <Form.Input name="formValues" placeholder={t("Search...")}/>
              <Form.Select name="category" compact options={options} placeholder={t("Category")}/>
              <Form.Button color="blue" content={t("Submit")}>{t("Search")}</Form.Button>
            </Form.Group>
          </Form>
        </div>

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