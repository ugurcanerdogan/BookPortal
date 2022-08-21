import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SignedIn = ({ signOut }) => {

  const { sub: loggedInUsername, name } = useSelector(state => state.auth);
  const { t } = useTranslation();

  return (
    <div>
      <Menu.Item>
        <Image avatar spaced="right" src="https://avatars.githubusercontent.com/u/45129020?v=4" />
        <Dropdown item pointing="top right" text={name}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/users/view/${loggedInUsername}`} text={t("My profile")} icon="info" />
            <Dropdown.Item onClick={signOut} text={t("Log out")} icon="sign-out" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
};

export default SignedIn;