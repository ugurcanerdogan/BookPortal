import React from "react";
import { withTranslation } from "react-i18next";

const Input = (props) => {
  const { t, label, error, name, onChange, type, defaultValue } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (<div className="form-group">
    <label>{label}</label>
    <input className={className} name={name} onChange={onChange} type={type} defaultValue={defaultValue} />
    <div className="invalid-feedback">
      {props.error}
    </div>
  </div>);
};

export default withTranslation()(Input);