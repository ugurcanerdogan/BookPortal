import React from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";


class UserSignupPage extends React.Component {

  state = {
    username: null,
    name: null,
    password: null,
    passwordRepeat: null,
    errors: {}
  };


  onChange = event => {
    const { t } = this.props;
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch!");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch!");
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors
    });
  };

  onClickSignUp = async event => {
    event.preventDefault();
    const { username, name, password } = this.state;
    const body = {
      username,
      name,
      password
    };


    this.setState({ pendingApiCall: true });
    try {
      // const response = await signUp(body);
      await signUp(body);
    } catch (error) {
      if (error.response.data && error.response.data === "Not a valid email") {
        this.setState({ errors: { username: "Not a valid email!" } });
      } else if (error.response.data && error.response.data === "email taken") {
        this.setState({ errors: { username: "Email has already taken! Try another username." } });
      } else if (error.response.data) {
        this.setState({ errors: error.response.data });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { errors } = this.state;
    const { name, username, password, passwordRepeat } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{this.props.t("Sign Up")}</h1>

          <Input name="username" label={t("Username")} error={username} onChange={this.onChange} />
          <Input name="name" label={t("Name-Surname")} error={name} onChange={this.onChange} />
          <Input name="password" label={t("Password")} error={password} type="password" onChange={this.onChange} />
          <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} type="password"
                 onChange={this.onChange} />

          <div className="text-center" style={{ marginTop: "10px" }}>
            <ButtonWithProgress onClick={this.onClickSignUp}
                                disabled={pendingApiCall || passwordRepeat !== undefined}
                                pendingApiCall={pendingApiCall}
                                text={t("Sign Up")}
            />
          </div>
        </form>
      </div>
    );
  }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgress = withApiProgress(UserSignupPageWithTranslation, "/api/v1/registration");
export default UserSignupPageWithApiProgress;