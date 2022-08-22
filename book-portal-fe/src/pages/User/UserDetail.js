import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Card, Dimmer, Grid, Header, Icon, Image, List, Loader, Message, Segment } from "semantic-ui-react";
import UserService from "../../services/UserService";
import userImage from "../../assets/userImage.png";
import bookPicture from "../../assets/bookImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useApiProgress } from "../../utilities/apiProgress";

const UserDetail = () => {

  const { t } = useTranslation();
  const { isAdmin, sub: loggedInUsername } = useSelector(state => state.auth);
  const [user, setUser] = useState({});
  const [readList, setReadList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [editable, setEditable] = useState(false);
  const [loadFailure, setLoadFailure] = useState(false);
  const userService = new UserService();
  const { username } = useParams();
  const pendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/users/by-username?username=");
  const { push } = useHistory();

  useEffect(() => {
    setLoadFailure(false);
    userService.getUserByUsername(username).then(user => {
      setUser(user.data);
      setReadList(user.data.readList);
      setFavList(user.data.favoriteList);
    }).catch(error => setLoadFailure(true));
  }, [username]);

  useEffect(() => {
    setEditable(isAdmin || username === loggedInUsername);
  }, [isAdmin, username, loggedInUsername]);

  const deleteUser = () => {
    userService.deleteUser(user.id).then(() => setUser({}));
    toast.success(t("User deleted!"), { autoClose: 500 });
    push("/users");
  };

  const removeFromReadingList = async (bookId) => {
    await userService.removeBookFromReadList(user.id, bookId);
    toast.success(t("Book removed from reading list!"), { autoClose: 500 });
    userService.getUserByUsername(username).then(user => {
      setReadList(user.data.readList);
    });
  };

  const removeFromFavList = async (bookId) => {
    await userService.removeBookFromFavList(user.id, bookId);
    toast.success(t("Book removed from favorite list!"), { autoClose: 500 });
    userService.getUserByUsername(username).then(user => {
      setFavList(user.data.favoriteList);
    });
  };

  let loadFail = (
    <Message negative>
      <Message.Header>{t("We couldn't load the user...")}</Message.Header>
      <p>{t("Error occurred...")}</p>
    </Message>
  );

  if (pendingApiCall) {
    return (
      (<Segment>
          <Dimmer active inverted>
            <Loader inverted content={t("Loading")} />
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      )
    );
  }

  let emptyList = (
    <Message info>
      <Message.Header>{t("The list is empty.")}</Message.Header>
      <p>{t("You can add books to your lists from book menu!")}</p>
    </Message>
  );

  return (
    !loadFailure ?
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
            <span>
              <Icon name="book" />
              {t("Number of books read: ")}{readList.length}
            </span>
          </Card.Content>
          {editable &&
            <div>
              <Link to={`/users/edit/${user.username}`}>
                <Button icon="edit" content={t("Edit User")} color="yellow" />
              </Link>
              {isAdmin && <Button icon="trash" onClick={deleteUser} content={t("Delete User")} color="yellow" />}
            </div>
          }
        </Card>
        {
          <Grid stackable columns={2}>
            <Grid.Column>
              <Segment>
                <Header color="green" as="h4" icon block textAlign="center">
                  <Icon name="book" circular />
                  <Header.Content>{t("Reading List")}</Header.Content>
                </Header>
                <List celled animated verticalAlign="middle">
                  {readList.length !== 0 ? readList.map((book, index) => (
                    <List.Item key={index}>
                      <Image avatar src={bookPicture} />
                      <List.Content as={Link} to={"/books/view/" + book.isbn}>
                        <List.Header>{book.title}</List.Header>
                      </List.Content>
                      {
                        (isAdmin || editable) &&
                        <List.Content floated="right">
                          <Button onClick={() => removeFromReadingList(book.id)} size="mini" icon="delete"
                                  color="orange" content={t("Remove")} />
                        </List.Content>
                      }
                    </List.Item>
                  )) : emptyList}
                </List>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header color="red" as="h4" icon block textAlign="center">
                  <Icon name="heart" circular />
                  <Header.Content>{t("Favorite List")}</Header.Content>
                </Header>
                <List celled animated verticalAlign="middle">
                  {favList.length !== 0 ? favList.map((book, index) => (
                    <List.Item key={index}>
                      <Image avatar src={bookPicture} />
                      <List.Content as={Link} to={"/books/view/" + book.isbn}>
                        <List.Header>{book.title}</List.Header>
                      </List.Content>
                      {
                        (isAdmin || editable) &&
                        <List.Content floated="right">
                          <Button onClick={() => removeFromFavList(book.id)} size="mini" icon="delete"
                                  color="orange" content={t("Remove")} />
                        </List.Content>
                      }
                    </List.Item>
                  )) : emptyList}
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
        }
      </div>
      : loadFail
  );
};

export default UserDetail;