import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header, Icon } from "semantic-ui-react";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import BookService from "../../services/BookService";

export const BookAdd = (props) => {

  const bookService = new BookService();
  const initialValues = { title: "", year: "", publisher: "", isbn: "", authorName: "", email: "", gender: "" };
  const schema = Yup.object({
    title: Yup.string().required("Kitap ismi zorunlu"),
    year: Yup.number().required("Yayım yılı zorunlu"),
    publisher: Yup.string().required("Yayın evinin ismi zorunlu"),
    isbn: Yup.number().required("ISBN zorunlu"),
    authorName: Yup.string().required("Yazar ismi zorunlu"),
    email: Yup.string().email().required("Yazar mail adresi zorunlu"),
    gender: Yup.string().required("Yazar cinsiyeti zorunlu")
  });

  const onSubmit = async (values) => {
    const { history } = props;
    const { push } = history;
    console.log(values);
    const bookInfo = { title: values.title, year: values.year, publisher: values.publisher, isbn: values.isbn };
    const authorInfo = { name: values.authorName, email: values.email, gender: values.gender };
    await bookService.addBook([bookInfo, authorInfo]);
    push("/books");
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="book" circular />
      <Header.Content>Add Book</Header.Content>
    </Header>
    <Formik initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="title" placeholder="Kitap ismi"></UqiTextInput>
        <UqiTextInput name="year" placeholder="Yayım yılı"></UqiTextInput>
        <UqiTextInput name="publisher" placeholder="Yayınlayanın ismi"></UqiTextInput>
        <UqiTextInput name="isbn" placeholder="ISBN"></UqiTextInput>
        <UqiTextInput name="authorName" placeholder="Yazar ismi"></UqiTextInput>
        <UqiTextInput name="email" placeholder="Yazar E-mail"></UqiTextInput>
        <UqiTextInput name="gender" placeholder="Cinsiyet"></UqiTextInput>
        <Button color="purple" type="submit">Submit</Button>
      </Form>
    </Formik>
  </div>);
};

export default BookAdd;