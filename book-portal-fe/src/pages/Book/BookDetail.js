import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Dimmer, Icon, Image, Loader, Message, Segment } from "semantic-ui-react";
import UserService from "../../services/UserService";
import BookService from "../../services/BookService";
import bookPicture from "../../assets/bookImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useApiProgress } from "../../utilities/apiProgress";

const BookDetail = (props) => {

  const { t } = useTranslation();
  const { id, isAdmin } = useSelector(state => state.auth);
  const [book, setBook] = useState({});
  const [editable, setEditable] = useState(false);
  const [loadFailure, setLoadFailure] = useState(false);
  const userService = new UserService();
  const bookService = new BookService();
  const { history } = props;
  const { push } = history;
  let { isbn } = useParams();
  const pendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/books/by-isbn?isbn=");

  useEffect(() => {
    setLoadFailure(false);
    bookService.getBookByIsbn(isbn).then(book => setBook(book.data)).catch(error => setLoadFailure(true));
  }, []);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);

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
                {book.publisher}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button onClick={() => addToReadList()} basic color="green">
                  <Icon name="book" /> {t("Add to Read List")}
                </Button>
                <Button onClick={() => addToFavList()} basic color="red">
                  <Icon name="heart" /> {t("Add to Fav List")}
                </Button>
              </div>
            </Card.Content>
            {editable &&
              <div>
                <Link to={`/books/edit/${book.isbn}`}>
                  <Button color="purple">
                    <Icon name="edit">
                    </Icon>{t("Edit Book")}
                  </Button>
                </Link>
                <Button color="purple" onClick={deleteBook}>
                  <Icon name="trash">
                  </Icon>{t("Delete Book")}
                </Button>
              </div>
            }
          </Card>
        </Card.Group>
      </div>
      : loadFail
  );
};

export default BookDetail;