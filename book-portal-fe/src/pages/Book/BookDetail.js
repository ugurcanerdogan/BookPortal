import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import BookService from "../../services/BookService";
import bookPicture from "../../assets/bookImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const BookDetail = (props) => {

  const { t } = useTranslation();
  const { isAdmin } = useSelector(state => state.auth);
  const [book, setBook] = useState({});
  const [editable, setEditable] = useState(false);
  const bookService = new BookService();
  const { history } = props;
  const { push } = history;
  let { isbn } = useParams();

  useEffect(() => {
    bookService.getBookByIsbn(isbn).then(book => setBook(book.data));
  }, []);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);

  const deleteBook = () => {
    bookService.deleteBook(book.id).then(() => setBook({}));
    toast.success(t("Book deleted!"), { autoClose: 500 });
    push("/books")
  }

  return (
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
            <Button basic color="green">
              <Icon name="book" /> {t("Add to Read List")}
            </Button>
            <Button basic color="red">
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
  </div>);
};

export default BookDetail;