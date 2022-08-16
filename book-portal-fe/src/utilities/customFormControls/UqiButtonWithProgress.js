import React from "react";
import { Button } from "semantic-ui-react";

const ButtonWithProgress = (props) => {

  const { onClick, disabled, pendingApiCall, color, text } = props;

  return (<Button disabled={disabled}
                  onClick={onClick}
                  loading={pendingApiCall}
                  color={color}>
    {text}
  </Button>);
};

export default ButtonWithProgress;