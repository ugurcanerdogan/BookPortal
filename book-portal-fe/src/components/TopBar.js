import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/navbarLogo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/AuthActions";

const TopBar = props => {

  const { t } = useTranslation();
  const { isAdmin } = props;
  const { username, isLoggedIn, name } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn, username: store.username, name: store.name
  }));

  const [menuVisible, setMenuVisible] = useState(false);

  const menuArea = useRef(null);

  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => {
      document.removeEventListener("click", menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = (event) => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

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
    let dropdownClass = "dropdown-menu p-0 shadow ";
    if (menuVisible) {
      dropdownClass += " show";
    }
    links = (<ul className="navbar-nav ms-auto" ref={menuArea}>
      <li className="nav-item dropdown p-0 shadow ">
        <div className="d-flex" style={{ cursor: "pointer" }} onClick={() => setMenuVisible(true)}>
          <span className="nav-link btn btn-success dropdown-toggle text-light"> {name} </span>
        </div>
        <div className={dropdownClass}>
          {isAdmin &&
            <>
              <Link onClick={() => setMenuVisible(false)} className="dropdown-item d-flex p-2" to={"/users/"}>
                <span className="material-icons text-dark me-2">manage_accounts</span>
                {t("User Panel")}
              </Link>
              <Link onClick={() => setMenuVisible(false)} className="dropdown-item d-flex p-2" to={"/authors/"}>
                <span className="material-icons ">local_library</span>
                {t("Author Panel")}
              </Link>
            </>
          }
          <Link onClick={() => setMenuVisible(false)} className="dropdown-item d-flex p-2" to={"/users/" + username}>
            <span className="material-icons text-dark me-2">person</span>
            {t("My Profile")}
          </Link>
          <span style={{ cursor: "pointer" }} className="dropdown-item d-flex p-2" onClick={onLogoutSuccess}>
            <span className="material-icons text-danger me-2">logout</span>
            {t("Logout")}
        </span>
        </div>
      </li>

    </ul>);
  }


  return (<div className="shadow-sm bg-primary mb-2">
    <nav className="navbar container navbar-expand justify-content-between">
      <Link className="navbar-brand" to="/">
        <img className="m-1" src={logo} width="100" alt="Book Portal Logo" />
      </Link>
      <form className="navbar-nav form-inline ms-auto">
        <input className="form-control me-sm-2" type="search" placeholder="Enter book title" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      {links}
    </nav>
  </div>);

};

export default (TopBar);
