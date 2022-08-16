import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SignedIn = ({ signOut }) => {

  const { sub: loggedInUsername, name } = useSelector(state => state.auth);

  // const {name} = useSelector(state=> state.update)
  return (
    <div>
      <Menu.Item>
        <Image avatar spaced="right" src="https://avatars.githubusercontent.com/u/45129020?v=4" />
        <Dropdown pointing="top right" text={name}>
          <Dropdown.Menu>
            <Link to={`/users/view/${loggedInUsername}`}>
              <Dropdown.Item text="Profilim" icon="info" />
            </Link>
            <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
};

export default SignedIn;