import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header, Icon } from "semantic-ui-react";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import AuthorService from "../../services/AuthorService";
import { useTranslation } from "react-i18next";

export const AuthorAdd = (props) => {

  const { t } = useTranslation();
  const authorService = new AuthorService();
  const initialValues = { name: "", email: "", gender: "" };
  const schema = Yup.object({
    name: Yup.string().required(t("Author name is required")),
    email: Yup.string().email().required(t("E-mail is required")),
    gender: Yup.string().required(t("Author gender is required"))
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
        <Header.Content>{t("Add Author")}</Header.Content>
      </Header>
      <Formik initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await onSubmit(values);
                resetForm();
              }}>
        <Form className="ui form">
          <UqiTextInput name="name" placeholder={t("Name-Surname")}></UqiTextInput>
          <UqiTextInput name="email" placeholder={t("E-mail")}></UqiTextInput>
          <div style={{ marginBottom: "10px" }}>
            <label>
              <Field type="radio" name="gender" value="M" />
              {t("Male")}
            </label>
            <label style={{ marginLeft: "10px" }}>
              <Field type="radio" name="gender" value="F" />
              {t("Female")}
            </label>
          </div>
          <Button color="pink" type="submit">{t("Add")}</Button>
        </Form>
      </Formik>
    </div>);
};

export default AuthorAdd;