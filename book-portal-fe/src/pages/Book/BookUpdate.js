import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import bookImage from "../../assets/bookImage.png";
import BookService from "../../services/BookService";

export const BookUpdate = (props) => {

  const dispatch = useDispatch();
  const initialValues = { name: "", password: "" };
  const [book, setBook] = useState({});
  const routeParams = useParams();
  const pathBookIsbn = routeParams.isbn;
  const bookService = new BookService();

  //update book by bookname eklenecek ayrı fonka ve submite
  useEffect(() => {
    bookService.getBookByIsbn(pathBookIsbn).then(book => setBook(book.data));
  }, []);


  const onSubmit = async (values) => {
    for (var propName in values) {
      if (values[propName] === null || values[propName] === undefined) {
        delete values[propName];
      }
    }
    const { history } = props;
    const { push } = history;
    const response = await bookService.updateBook(book.id, values);
    setBook(response);
    push("/books");
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="book" circular />
      <Header.Content>Update Book</Header.Content>
    </Header>

    <Card fluid>
      <Image src={bookImage} size="medium" centered />
      <Card.Content>
        <Card.Header>{book.title}</Card.Header>
        <Card.Description>
          {book.publisher}
        </Card.Description>
      </Card.Content>
    </Card>

    <Formik initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="title" placeholder="Kitap ismi"></UqiTextInput>
        <UqiTextInput name="year" placeholder="Yayın yılı"></UqiTextInput>
        <UqiTextInput name="publisher" placeholder="Yayınlayanın ismi"></UqiTextInput>
        <Button color="yellow" type="submit">Save</Button>
      </Form>
    </Formik>
  </div>);
};

export default BookUpdate;