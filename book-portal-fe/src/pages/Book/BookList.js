import React, { useEffect, useState } from "react";
import { Button, Card, Dimmer, Icon, Image, Loader, Menu, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import bookPicture from "../../assets/bookImage.png";
import BookService from "../../services/BookService";
import UserService from "../../services/UserService";
import { useApiProgress } from "../../utilities/apiProgress";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BookList = () => {

  const bookService = new BookService();
  const userService = new UserService();
  const { id } = useSelector(state => state.auth);
  const { t } = useTranslation();
  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });
  const { content: allBooks, last, first } = page;
  const [loadFailure, setLoadFailure] = useState(false);
  const pendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/books/with-jpa-pagination?pageNumber");

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

  const addToReadList = async (bookId) => {
    try {
      await userService.addBookToReadList(id, bookId);
      toast.success(t("Book is added to your reading list!"));
    } catch (e) {
      toast.error(t("Book is already in your reading list!"));
    }
  };

  const addToFavList = async (bookId) => {
    try {
      await userService.addBookToFavList(id, bookId);
      toast.success(t("Book is added to your favorite list!"));
    } catch (e) {
      toast.error(t("Book is already in your favorite list!"));
    }
  };

  const loadBooks = (pageNumber, pageSize) => {
    setLoadFailure(false);
    bookService.getBooksWithPagination(pageNumber, pageSize).then(response => {
      setPage(response.data);
    }).catch(error => {
      setLoadFailure(true);
    });
  };

  let notOnlyOnePage = last && first;

  let loadFail = (
    <Message negative>
      <Message.Header>{t("We couldn't load the books...")}</Message.Header>
      <p>{t("Error occurred...")}</p>
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
                  <Button onClick={() => {
                    addToReadList(book.id);
                  }} basic color="green">
                    <Icon name="book" />{t("Add to Read List")}
                  </Button>
                  <Button onClick={() => {
                    addToFavList(book.id);
                  }} basic color="red">
                    <Icon name="heart" />{t("Add to Fav List")}
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