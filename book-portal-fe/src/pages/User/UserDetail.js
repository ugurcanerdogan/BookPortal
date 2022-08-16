import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import UserService from "../../services/UserService";
import userImage from "../../assets/userImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const UserDetail = () => {

  const { isAdmin, sub: loggedInUsername } = useSelector(state => state.auth);

  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);

  let routeParams = useParams();
  const pathUserName = routeParams.username;

  useEffect(() => {
    let userService = new UserService();
    userService.getUserByUsername(pathUserName).then(user => setUser(user.data));
  }, []);

  useEffect(() => {
    setEditable(isAdmin || pathUserName === loggedInUsername);
  }, [isAdmin, pathUserName, loggedInUsername]);


  return (<div>
    <Card fluid>
      <Image src={userImage} size="medium" centered />
      <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="book" />
          22 books has read
        </a>
      </Card.Content>
      {editable &&
        <Link to={`/users/edit/${user.username}`}>
          <Button color="yellow">Edit User</Button>
        </Link>}

    </Card>
  </div>);
};

export default UserDetail;