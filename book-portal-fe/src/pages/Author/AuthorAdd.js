import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header, Icon } from "semantic-ui-react";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import AuthorService from "../../services/AuthorService";

export const AuthorAdd = (props) => {

  const authorService = new AuthorService();
  const initialValues = { name: "", email: "", gender: "" };
  const schema = Yup.object({
    name: Yup.string().required("Yazar ismi zorunlu"),
    email: Yup.string().email().required("E-mail adresi zorunlu"),
    gender: Yup.string().required("Cinsiyet zorunlu")
  });

  const onSubmit = async (values) => {
    const { history } = props;
    const { push } = history;
    await authorService.addAuthor(values);
    push("/authors");
  };

  return (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="users" circular />
        <Header.Content>Add Author</Header.Content>
      </Header>
      <Formik initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await onSubmit(values);
                resetForm();
              }}>
        <Form className="ui form">
          <UqiTextInput name="name" placeholder="İsim-Soyisim"></UqiTextInput>
          <UqiTextInput name="email" placeholder="E-mail"></UqiTextInput>
          <div style={{ marginBottom: "10px" }}>
            <label>
              <Field type="radio" name="gender" value="M" />
              Male
            </label>
            <label style={{ marginLeft: "10px" }}>
              <Field type="radio" name="gender" value="F" />
              Female
            </label>
          </div>
          <Button color="pink" type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>);
};

export default AuthorAdd;