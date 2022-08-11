import React from "react";
import logo from "../assets/navbarLogo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/AuthActions";


const TopBar = props => {


  const { t } = useTranslation();

  const { username, isLoggedIn, name } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn, username: store.username, name: store.name
  }));

  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let links = (<ul className="navbar-nav ms-auto">
    <li>
      <Link className="nav-link" style={{ color: "white" }} to="/login">
        {t("Login")}
      </Link>
    </li>
    <li>
      <Link className="nav-link" style={{ color: "white" }} to="/signup">
        {t("Sign Up")}
      </Link>
    </li>
  </ul>);
  if (isLoggedIn) {
    links = (<ul className="navbar-nav ms-auto">
      <li>
        <Link style={{ color: "white" }} className="nav-link" to={"/users/" + username}>
          {name}
        </Link>
      </li>
      <li style={{ color: "white", cursor: "pointer" }} className="nav-link" onClick={onLogoutSuccess}>
        {t("Logout")}
      </li>
    </ul>);
  }
  return (<div className="shadow-sm bg-primary mb-2">
    <nav className="navbar navbar-dark  container navbar-expand">
      <Link className="navbar-brand" to="/">
        <img className="m-1" src={logo} width="100" alt="Book Portal Logo" />
      </Link>
      {links}
    </nav>
  </div>);

};

export default (TopBar);
