import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header, Icon } from "semantic-ui-react";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import UserService from "../../services/UserService";
import { useTranslation } from "react-i18next";

export const UserAdd = (props) => {

  const { t } = useTranslation();
  const userService = new UserService();
  const initialValues = { name: "", username: "", password: "" };
  const schema = Yup.object({
    name: Yup.string().required(t("Name-Surname is required")),
    username: Yup.string().email().required(t("Username is required")),
    password: Yup.string().required(t("Password is required"))
  });

  const onSubmit = async (values) => {
    const { history } = props;
    const { push } = history;
    console.log(values);
    await userService.addUser(values);
    push("/users");
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="users" circular />
      <Header.Content>{t("Add User")}</Header.Content>
    </Header>
    <Formik initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="name" placeholder={t("Name-Surname")}></UqiTextInput>
        <UqiTextInput name="username" placeholder={t("Username")}></UqiTextInput>
        <UqiTextInput name="password" placeholder={t("Password")} type="password"></UqiTextInput>
        <Button color="yellow" type="submit">{t("Add")}</Button>
      </Form>
    </Formik>
  </div>);
};

export default UserAdd;