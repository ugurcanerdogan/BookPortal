import React from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import UqiTextInput from "../utilities/customFormControls/UqiTextInput";
import { signupHandler } from "../store/actions/authActions";
import { toast } from "react-toastify";


const SignUpPage = (props) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialValues = { username: "", name: "", password: "" };
  const schema = Yup.object({
    username: Yup.string().email().required(t("E-mail is required")),
    name: Yup.string().required(t("Name-Surname is required")),
    password: Yup.string().required(t("Password is required"))
  });

  const onClickSignUp = async values => {

    const { history } = props;
    const { push } = history;

    try {
      await dispatch(signupHandler(values));
      toast.success(t("Redirecting..."), { autoClose: 500 });
      push("/");
    } catch (apiError) {
      toast.error(t("Sign up failed..."), { autoClose: 750 });
      console.log(apiError);
    }
  };

  return (<div>
    <Segment inverted color="blue">
      <Header as="h2" icon textAlign="center">
        <Icon inverted color="pink" name="signup" circular />
        <Header.Content>{t("Sign Up")}</Header.Content>
      </Header>
      <Formik initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await onClickSignUp(values);
                resetForm();
              }}>
        <Form className="ui form">
          <UqiTextInput name="username" placeholder={t("Username")}></UqiTextInput>
          <UqiTextInput name="name" placeholder={t("Name-Surname")}></UqiTextInput>
          <UqiTextInput name="password" placeholder={t("Password")} type="password"></UqiTextInput>
          <Button color="pink" type="submit">{t("Sign Up")}</Button>
        </Form>
      </Formik>
    </Segment>
  </div>);

};

export default SignUpPage;