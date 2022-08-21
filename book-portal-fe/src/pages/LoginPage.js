import React from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import UqiTextInput from "../utilities/customFormControls/UqiTextInput";
import { loginHandler } from "../store/actions/authActions";
import { toast } from "react-toastify";


const LoginPage = (props) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialValues = { username: "", password: "" };
  const schema = Yup.object({
    username: Yup.string().email().required(t("E-mail is required")),
    password: Yup.string().required(t("Password is required"))
  });

  const onClickLogin = async values => {

    const { history } = props;
    const { push } = history;

    try {
      await dispatch(loginHandler(values));
      toast.success(t("Redirecting..."), { autoClose: 500 });
      push("/");
    } catch (apiError) {
      toast.error(t("Log in failed..."), { autoClose: 750 });
    }
  };

  return (<div>
    <Segment inverted color="blue">
      <Header as="h2" icon textAlign="center">
        <Icon inverted color="yellow" name="sign-in" circular />
        <Header.Content>{t("Log In")}</Header.Content>
      </Header>
      <Formik initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await onClickLogin(values);
                resetForm();
              }}>
        <Form className="ui form">
          <UqiTextInput name="username" placeholder={t("Username")}></UqiTextInput>
          <UqiTextInput name="password" placeholder={t("Password")} type="password"></UqiTextInput>
          <Button color="yellow" type="submit">{t("Log In")}</Button>
        </Form>
      </Formik>
    </Segment>
  </div>);

};

export default (LoginPage);