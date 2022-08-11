import React from "react";

const ButtonWithProgress = (props) => {

  const { onClick, disabled, pendingApiCall, text } = props;


  return (<button className="btn btn-info"
                  disabled={disabled}
                  onClick={onClick}>
    {pendingApiCall && <span className="spinner-grow spinner-grow-sm"></span>} {text}
  </button>);
};

export default ButtonWithProgress;