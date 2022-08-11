import React from "react";
import { withTranslation } from "react-i18next";

const Input = (props) => {
  const { t, label, error, name, onChange, type } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (<div className="form-group">
    <label>{label}</label>
    <input className={className} name={name} onChange={onChange} type={type} />
    <div className="invalid-feedback">
      {t(error)}
    </div>
  </div>);
};

export default withTranslation()(Input);