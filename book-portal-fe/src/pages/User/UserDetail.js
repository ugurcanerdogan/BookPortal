import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import UserService from "../../services/UserService";
import userImage from "../../assets/userImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const UserDetail = (props) => {

  const { t } = useTranslation();
  const { isAdmin, sub: loggedInUsername } = useSelector(state => state.auth);
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const userService = new UserService();
  const { history } = props;
  const { push } = history;
  const { username } = useParams();

  useEffect(() => {
    userService.getUserByUsername(username).then(user => setUser(user.data));
  }, [username]);

  useEffect(() => {
    setEditable(isAdmin || username === loggedInUsername);
  }, [isAdmin, username, loggedInUsername]);

  const deleteUser = () => {
    userService.deleteUser(user.id).then(() => setUser({}));
    toast.success(t("User deleted!"), { autoClose: 500 });
    push("/users")
  }

  return (
    <div>
    <Card fluid>
      <Image src={userImage} size="medium" centered />
      <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>
          <span className="date">{t("Info")}</span>
        </Card.Meta>
        <Card.Description>
          {t("Additional info")}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="book" />
          {t(".. books read")}
        </a>
      </Card.Content>
      {editable &&
        <div>
          <Link to={`/users/edit/${user.username}`}>
            <Button color="yellow">
              <Icon name="edit">
              </Icon>{t("Edit User")}
            </Button>
          </Link>
          { isAdmin &&
            <Button color="yellow" onClick={deleteUser}>
            <Icon name="trash">
            </Icon>{t("Delete User")}
          </Button>}
        </div>
      }
    </Card>
  </div>);
};

export default UserDetail;