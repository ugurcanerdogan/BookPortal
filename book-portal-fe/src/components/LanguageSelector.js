import React from "react";
import { withTranslation } from "react-i18next";


const LanguageSelector = (props) => {

  const onChangeLanguage = language => {
    const { i18n } = props;
    i18n.changeLanguage(language);

  };

  return (
    <div className="container">
      <img src="https://countryflagsapi.com/png/tr" onClick={() => onChangeLanguage("tr")}
           style={{ cursor: "pointer" }} height="24px" width="40px" alt="Turkish Flag"></img>
      <img src="https://countryflagsapi.com/png/gb" onClick={() => onChangeLanguage("en")}
           style={{ cursor: "pointer" }} height="24px" width="40px" alt="GB Flag"></img>
    </div>
  );
};

export default withTranslation()(LanguageSelector);