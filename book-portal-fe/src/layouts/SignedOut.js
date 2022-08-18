import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignedOut = () => {

  const { t } = useTranslation();

  return (
    <div>
      <Link to="/login">
        <Button style={{ marginTop: "0.5em" }} color="blue">{t("Log in")}</Button>
      </Link>
      <Link to="/signup">
        <Button color="blue" style={{ marginLeft: "0.5em" }}>{t("Sign Up")}</Button>
      </Link>
    </div>
  );
};

export default SignedOut;