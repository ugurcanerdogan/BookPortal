import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import BookService from "../../services/BookService";
import bookPicture from "../../assets/bookImage.png";
import { useSelector } from "react-redux";

const BookDetail = () => {

  const { isAdmin } = useSelector(state => state.auth);
  let { isbn } = useParams();
  const [book, setBook] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    let bookService = new BookService();
    bookService.getBookByIsbn(isbn).then(book => setBook(book.data));
  }, []);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);


  return (<div>
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
              <Icon name="book" /> Add to Read List
            </Button>
            <Button basic color="red">
              <Icon name="heart" /> Add to Fav List
            </Button>
          </div>
        </Card.Content>
        {editable &&
          <Link to={`/books/edit/${book.isbn}`}>
            <Button color="purple">Edit Book</Button>
          </Link>}
      </Card>
    </Card.Group>
  </div>);
};

export default BookDetail;