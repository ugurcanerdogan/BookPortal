import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { loginHandler } from "../AuthActions";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";


class LoginPage extends Component {

  state = {
    username: null,
    password: null,
    error: null
  };


  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username,
      password
    };

    this.setState({
      error: null
    });

    try {
      await loginHandler(creds);
    } catch (apiError) {
      if (apiError.response.status === 401) {
        this.setState({
          error: "Login Failed !"
        });
      }
    }
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null
    });
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonEnabled = username && password;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input label={t("Username")} name="username" onChange={this.onChange} />
          <Input label={t("Password")} name="password" onChange={this.onChange} type="password" />
          {error &&
            <div className="alert alert-danger" style={{ marginTop: "10px" }}> {t(this.state.error)} </div>}
          <div className="text-center" style={{ marginTop: "10px" }}>
            <ButtonWithProgress onClick={this.onClickLogin}
                                disabled={!buttonEnabled || pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={t("Login")}
            />
          </div>
        </form>
      </div>
    );
  }
}
const LoginPageWithTranslation = withTranslation()(LoginPage);
export default withApiProgress(LoginPageWithTranslation, "/api/v1/login");