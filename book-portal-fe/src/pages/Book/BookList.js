import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Image, Menu, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import bookPicture from "../../assets/bookImage.png";
import BookService from "../../services/BookService";

const BookList = () => {

  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });

  const { content: allBooks, last, first } = page;
  const [loadFailure, setLoadFailure] = useState(false);


  useEffect(() => {
    loadBooks();
  }, []);

  const onClickNext = () => {
    const prevPage = page.number + 1;
    loadBooks(prevPage);
  };

  const onClickPrevious = () => {
    const nextPage = page.number - 1;
    loadBooks(nextPage);
  };

  const loadBooks = (loggedInUsername, pageNumber, pageSize) => {
    const bookService = new BookService();
    setLoadFailure(false);
    bookService.getBooksWithPagination(pageNumber, pageSize).then(response => {
      setPage(response.data
        // books: response.data
      );
    }).catch(error => {
      setLoadFailure(true);
    });
  };

  let notOnlyOnePage = last && first;

  let loadFail = (
    <Message negative>
      <Message.Header>We're sorry we can't load the books.</Message.Header>
      <p>Error occured...</p>
    </Message>
  );

  let actionDiv = (
    <Menu floated="right" pagination>
      {first === false && <Menu.Item onClick={onClickPrevious} as="a" icon>
        <Icon name="chevron left" />
      </Menu.Item>}
      {last === false && <Menu.Item onClick={onClickNext} as="a" icon>
        <Icon name="chevron right" />
      </Menu.Item>}
    </Menu>);

  return (
    !loadFailure ?
      <div>
        <Card.Group itemsPerRow={3}>
          {allBooks.map((book) => (
            <Card>
              <Card.Content as={Link} to={"/books/view/" + book.isbn}>
                <Image
                  floated="right"
                  size="mini"
                  src={bookPicture}
                />
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>{book.year}</Card.Meta>
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
            </Card>
          ))}
        </Card.Group>
        {!notOnlyOnePage && actionDiv}
      </div>
      : loadFail
  );
};

export default BookList;