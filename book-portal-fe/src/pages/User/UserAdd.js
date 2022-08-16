import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header, Icon } from "semantic-ui-react";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import UserService from "../../services/UserService";

export const UserAdd = (props) => {

  const userService = new UserService();
  const initialValues = { name: "", username: "", password: "" };
  const schema = Yup.object({
    name: Yup.string().required("İsim-Soyisim zorunlu"),
    username: Yup.string().email().required("Kullanıcı adı zorunlu"),
    password: Yup.string().required("Şifre zorunlu")
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
      <Header.Content>Add User</Header.Content>
    </Header>
    <Formik initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="name" placeholder="İsim-Soyisim"></UqiTextInput>
        <UqiTextInput name="username" placeholder="E-mail"></UqiTextInput>
        <UqiTextInput name="password" placeholder="Şifre" type="password"></UqiTextInput>
        <Button color="yellow" type="submit">Submit</Button>
      </Form>
    </Formik>
  </div>);
};

export default UserAdd;