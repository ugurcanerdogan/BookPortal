import React from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import UqiTextInput from "../utilities/customFormControls/UqiTextInput";
import { loginHandler } from "../store/actions/authActions";


const LoginPage = (props) => {

  const dispatch = useDispatch();
  const initialValues = { username: "", password: "" };
  const schema = Yup.object({
    username: Yup.string().email().required("Kullanıcı adı zorunlu"),
    password: Yup.string().required("Şifre zorunlu")
  });

  const onClickLogin = async values => {

    const { history } = props;
    const { push } = history;

    try {
      await dispatch(loginHandler(values));
      push("/");
    } catch (apiError) {
      console.log(apiError);
    }
  };

  const { t } = useTranslation();

  return (<div>
    <Segment inverted color="blue">
      <Header as="h2" icon textAlign="center">
        <Icon inverted color="yellow" name="sign-in" circular />
        <Header.Content> Log In</Header.Content>
      </Header>
      <Formik initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await onClickLogin(values);
                resetForm();
              }}>
        <Form className="ui form">
          <UqiTextInput name="username" placeholder="E-mail"></UqiTextInput>
          <UqiTextInput name="password" placeholder="Şifre" type="password"></UqiTextInput>
          <Button color="yellow" type="submit">Login</Button>
        </Form>
      </Formik>
    </Segment>

  </div>);

};


export default (LoginPage);