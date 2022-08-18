import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import bookImage from "../../assets/bookImage.png";
import BookService from "../../services/BookService";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const BookUpdate = (props) => {

  const { t } = useTranslation();
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

    try{
      const response = await bookService.updateBook(book.id, values);
      setBook(response);
      toast.success(t("Book updated!"), { autoClose: 500 });
      push("/books");
    }catch (apiError){
      toast.error(t("Update failed..."), { autoClose: 750 });
    }
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="book" circular />
      <Header.Content>{t("Update Book")}</Header.Content>
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
        <UqiTextInput name="title" placeholder={t("Book Title")}></UqiTextInput>
        <UqiTextInput name="year" placeholder={t("Published Year")}></UqiTextInput>
        <UqiTextInput name="publisher" placeholder={t("Publisher Name")}></UqiTextInput>
        <Button color="yellow" type="submit">{t("Update")}</Button>
      </Form>
    </Formik>
  </div>);
};

export default BookUpdate;