import React, { useEffect, useState } from "react";
import AuthorCard from "../components/Author/AuthorCard";
import { getAuthor } from "../api/apiCalls";
import { useTranslation } from "react-i18next";


const AuthorPage = (props) => {
  const [author, setAuthor] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setNotFound(false);
  }, [author]);

  useEffect(() => {
    const loadAuthor = async () => {
      try {
        const response = await getAuthor(props.match.params.name);
        setAuthor(response.data);

      } catch (e) {
        setNotFound(true);
      }
    };
    loadAuthor();
  }, [props.match.params.name]);

  if (notFound) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: 48, color: "red" }}>error</i>
          </div>
          {t("Author not found!")}
        </div>
      </div>
    );
  }

  return (<div className="container">
    <AuthorCard author={author} />
  </div>);
};

export default AuthorPage;