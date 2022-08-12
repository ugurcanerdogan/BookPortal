import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { signupHandler } from "../redux/AuthActions";
import { useDispatch } from "react-redux";
import { useApiProgress } from "../shared/ApiProgress";


const UserSignupPage = (props) => {

  const [form, setForm] = useState({
    username: null, name: null, password: null, passwordRepeat: null
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onChange = event => {
    const { name, value } = event.target;
    setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };


  const onClickSignUp = async event => {
    event.preventDefault();

    const { history } = props;
    const { push } = history;

    const { username, name, password } = form;

    const body = {
      username, name, password
    };

    try {
      await dispatch(signupHandler(body));
      push("/");
    } catch (error) {
      if (error.response.data && error.response.data === "Not a valid email") {
        setErrors({ username: "Not a valid email!" });
      } else if (error.response.data && error.response.data === "email taken") {
        setErrors({ username: "Email has already taken! Try another username." });
      } else if (error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const { t } = useTranslation();

  const { username: usernameError, name: nameError, password: passwordError } = errors;

  const pendingApiCallSignup = useApiProgress("post", "/api/v1/registration");
  const pendingApiCallLogin = useApiProgress("post", "/api/v1/login");
  const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;


  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t("Password mismatch!");
  }

  return (<div className="container">
    <form>
      <h1 className="text-center">{t("Sign Up")}</h1>

      <Input name="username" label={t("Username")} error={usernameError} onChange={onChange} />
      <Input name="name" label={t("Name-Surname")} error={nameError} onChange={onChange} />
      <Input name="password" label={t("Password")} error={passwordError} type="password" onChange={onChange} />
      <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeatError} type="password"
             onChange={onChange} />

      <div className="text-center" style={{ marginTop: "10px" }}>
        <ButtonWithProgress onClick={onClickSignUp}
                            disabled={pendingApiCall || passwordRepeatError !== undefined}
                            pendingApiCall={pendingApiCall}
                            text={t("Sign Up")}
        />
      </div>
    </form>
  </div>);


};

export default (UserSignupPage);