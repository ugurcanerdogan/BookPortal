import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignedOut = ({ signIn }) => {
  return (
    <div>
      <Link to="/login">
        <Button style={{ marginTop: "0.5em" }} color="blue">Giriş Yap</Button>
      </Link>
      <Link to="/signup">
        <Button color="blue" style={{ marginLeft: "0.5em" }}>Kayıt Ol</Button>
      </Link>
    </div>
  );
};

export default SignedOut;