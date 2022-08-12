import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/AuthActions";

const LoginPage = (props) => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async event => {
    event.preventDefault();

    const creds = {
      username, password
    };

    const { history } = props;
    const { push } = history;

    setError(undefined);
    try {
      await dispatch(loginHandler(creds));
      push("/");
    } catch (apiError) {
      console.log(apiError);
      if (apiError.response.status === 401) {
        setError("Login Failed !");
      }
    }
  };

  const { t } = useTranslation();
  const pendingApiCall = useApiProgress("post", "/api/v1/login");
  const buttonEnabled = username && password;

  return (<div className="container">
    <form>
      <h1 className="text-center">{t("Login")}</h1>
      <Input label={t("Username")} onChange={(event => setUsername(event.target.value))} />
      <Input label={t("Password")} onChange={(event => setPassword(event.target.value))} type="password" />
      {error && <div className="alert alert-danger" style={{ marginTop: "10px" }}> {t(error)} </div>}
      <div className="text-center" style={{ marginTop: "10px" }}>
        <ButtonWithProgress onClick={onClickLogin}
                            disabled={!buttonEnabled || pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={t("Login")}
        />
      </div>
    </form>
  </div>);

};


export default (LoginPage);