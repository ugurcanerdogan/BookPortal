import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Dimmer, Grid, Header, Icon, Image, List, Loader, Message, Segment } from "semantic-ui-react";
import UserService from "../../services/UserService";
import BookService from "../../services/BookService";
import bookPicture from "../../assets/bookImage.png";
import userImage from "../../assets/userImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useApiProgress } from "../../utilities/apiProgress";

const BookDetail = (props) => {

  const { t } = useTranslation();
  const { id, isAdmin } = useSelector(state => state.auth);
  const [book, setBook] = useState({});
  const [readingUsersList, setReadingUsersList] = useState([]);
  const [favUsersList, setFavUsersList] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editable, setEditable] = useState(false);
  const [loadFailure, setLoadFailure] = useState(false);
  const userService = new UserService();
  const bookService = new BookService();
  const { history } = props;
  const { push } = history;
  let { isbn } = useParams();
  let authorNames = "";

  const pendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/books/by-isbn?isbn=");

  useEffect(() => {
    setLoadFailure(false);
    bookService.getBookByIsbn(isbn).then(book => {
      setBook(book.data);
      bookService.getUsersAddedToReadList(book.data.id).then(response => setReadingUsersList(response.data));
      bookService.getUsersAddedToFavList(book.data.id).then(response => setFavUsersList(response.data));
      bookService.getAuthorOfBook(book.data.id).then(response => setAuthors(response.data));
    }).catch(error => setLoadFailure(true));
  }, []);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);

  const extraHandler = () => {
    authors.map(author => {
      authorNames += author.name + ", ";
    });
    if (authors.length === 1) {
      authorNames = authorNames.substring(0, authorNames.length - 2);
    }
    return (
      <span>
        <span>
             <Icon name="pencil" />
          {authorNames}
        </span>
        <span> / </span>
        <span>
          <Icon name="print" />
          {book.publisher}
        </span>
      </span>

    );
  };

  const deleteBook = () => {
    bookService.deleteBook(book.id).then(() => setBook({}));
    toast.success(t("Book deleted!"), { autoClose: 500 });
    push("/books");
  };

  const addToReadList = async () => {
    try {
      await userService.addBookToReadList(id, book.id);
      toast.success("Book is added to your reading list!");
    } catch (e) {
      toast.error("Book is already in your reading list!");
    }
  };

  const addToFavList = async () => {
    try {
      await userService.addBookToFavList(id, book.id);
      toast.success("Book is added to your favorite list!");
    } catch (e) {
      toast.error("Book is already in your favorite list!");
    }
  };

  let loadFail = (
    <Message negative>
      <Message.Header>{t("We couldn't load the book...")}</Message.Header>
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
      <p>{t("Poke users to add this book to the list!")}</p>
    </Message>
  );

  return (
    !loadFailure ?
      <div>
        <Card.Group>
          <Card fluid>
            <Image src={bookPicture} size="medium" centered />
            <Card.Content>
              <Card.Header>{book.title}</Card.Header>
              <Card.Meta>
                <span className="date">{book.year}</span>
              </Card.Meta>
              <Card.Description>
                {extraHandler()}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button icon="book" onClick={() => addToReadList()} content={t("Add to Read List")} color="green" />
                <Button icon="heart" onClick={() => addToFavList()} content={t("Add to Fav List")} color="red" />
              </div>
            </Card.Content>
            {editable &&
              <div>
                <Link to={`/books/edit/${book.isbn}`}>
                  <Button icon="edit" content={t("Edit Book")} color="purple" />
                </Link>
                <Button icon="trash" onClick={deleteBook} content={t("Delete Book")} color="purple" />
              </div>
            }
          </Card>
        </Card.Group>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment>
              <Header color="green" as="h4" icon block textAlign="center">
                <Icon name="book" circular />
                <Header.Content>{t("Users added to Reading List")}</Header.Content>
              </Header>
              <List celled animated verticalAlign="middle">
                {readingUsersList.length !== 0 ? readingUsersList.map((user, index) => (
                  <List.Item key={index}>
                    <Image avatar src={userImage} />
                    <List.Content as={Link} to={"/users/view/" + user.username}>
                      <List.Header>{user.name}</List.Header>
                    </List.Content>
                  </List.Item>
                )) : emptyList}
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header color="red" as="h4" icon block textAlign="center">
                <Icon name="heart" circular />
                <Header.Content>{t("Users added to Favorite List")}</Header.Content>
              </Header>
              <List celled animated verticalAlign="middle">
                {favUsersList.length !== 0 ? favUsersList.map((user, index) => (
                  <List.Item key={index}>
                    <Image avatar src={userImage} />
                    <List.Content as={Link} to={"/users/view/" + user.username}>
                      <List.Header>{user.name}</List.Header>
                    </List.Content>
                  </List.Item>
                )) : emptyList}
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
      : loadFail
  );
};

export default BookDetail;