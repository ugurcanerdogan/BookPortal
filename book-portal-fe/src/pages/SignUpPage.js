import React from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import UqiTextInput from "../utilities/customFormControls/UqiTextInput";
import { signupHandler } from "../store/actions/authActions";


const SignupPage = (props) => {

  const dispatch = useDispatch();
  const initialValues = { username: "", name: "", password: "" };
  const schema = Yup.object({
    username: Yup.string().email().required("Kullanıcı adı zorunlu"),
    name: Yup.string().required("İsim-Soyisim zorunlu"),
    password: Yup.string().required("Şifre zorunlu")
  });


  const onClickSignIn = async values => {

    const { history } = props;
    const { push } = history;

    try {
      await dispatch(signupHandler(values));
      push("/");
    } catch (apiError) {
      console.log(apiError);
    }
  };

  const { t } = useTranslation();

  return (<div>
    <Segment inverted color="blue">
      <Header as="h2" icon textAlign="center">
        <Icon inverted color="pink" name="signup" circular />
        <Header.Content>Register</Header.Content>
      </Header>
      <Formik initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await onClickSignIn(values);
                resetForm();
              }}>
        <Form className="ui form">
          <UqiTextInput name="username" placeholder="E-mail"></UqiTextInput>
          <UqiTextInput name="name" placeholder="İsim-Soyisim"></UqiTextInput>
          <UqiTextInput name="password" placeholder="Şifre" type="password"></UqiTextInput>
          <Button color="pink" type="submit">Sign In</Button>
        </Form>
      </Formik>
    </Segment>
  </div>);


};

export default SignupPage;