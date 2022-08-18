import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header, Icon } from "semantic-ui-react";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import BookService from "../../services/BookService";
import { useTranslation } from "react-i18next";

export const BookAdd = (props) => {

  const { t } = useTranslation();
  const bookService = new BookService();
  const initialValues = { title: "", year: "", publisher: "", isbn: "", authorName: "", email: "", gender: "" };
  const schema = Yup.object({
    title: Yup.string().required(t("Book Title is required")),
    year: Yup.number().required(t("Publish year is required")),
    publisher: Yup.string().required(t("Publisher name is required")),
    isbn: Yup.number().required(t("ISBN is required")),
    authorName: Yup.string().required(t("Author name is required")),
    email: Yup.string().email().required(t("E-mail is required")),
    gender: Yup.string().required(t("Author gender is required"))
  });


  const onSubmit = async (values) => {
    const { history } = props;
    const { push } = history;
    const bookInfo = { title: values.title, year: values.year, publisher: values.publisher, isbn: values.isbn };
    const authorInfo = { name: values.authorName, email: values.email, gender: values.gender };
    await bookService.addBook([bookInfo, authorInfo]);
    push("/books");
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="book" circular />
      <Header.Content>{t("Add Book")}</Header.Content>
    </Header>
    <Formik initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="title" placeholder={t("Book Title")}></UqiTextInput>
        <UqiTextInput name="year" placeholder={t("Publish Year")}></UqiTextInput>
        <UqiTextInput name="publisher" placeholder={t("Publisher Name")}></UqiTextInput>
        <UqiTextInput name="isbn" placeholder={t("ISBN")}></UqiTextInput>
        <UqiTextInput name="authorName" placeholder={t("Author name")}></UqiTextInput>
        <UqiTextInput name="email" placeholder={t("Author e-mail")}></UqiTextInput>
        <UqiTextInput name="gender" placeholder={t("Author gender")}></UqiTextInput>
        <Button color="purple" type="submit">{t("Add")}</Button>
      </Form>
    </Formik>
  </div>);
};

export default BookAdd;