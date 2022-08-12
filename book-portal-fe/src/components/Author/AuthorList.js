import React, { useEffect, useState } from "react";
import { getAuthorsWithPagination } from "../../api/apiCalls";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../../shared/ApiProgress";
import AuthorListItem from "../../components/Author/AuthorListItem";
import { useSelector } from "react-redux";

const AuthorList = () => {

  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress("get", "/api/v1/authors/with-jpa-pagination?pageNumber");


  useEffect(() => {
    loadAuthors();
  }, []);

  const onClickNext = () => {
    const prevPage = page.number + 1;
    loadAuthors(prevPage);
  };

  const onClickPrevious = () => {
    const nextPage = page.number - 1;
    loadAuthors(nextPage);
  };

  const loadAuthors = (pageNumber, pageSize) => {
    setLoadFailure(false);
    getAuthorsWithPagination(pageNumber, pageSize).then(response => {
      setPage(response.data
        // users: response.data
      );
    }).catch(error => {
      setLoadFailure(true);
    });
  };

  const { t } = useTranslation();
  const { content: allAuthors, last, first } = page;

  let actionDiv = (<div>
    {first === false &&
      <button onClick={onClickPrevious} className="btn btn-sm btn-light float-start">{t("Previous")}</button>}
    {last === false && <button onClick={onClickNext} className="btn btn-sm btn-light float-end">{t("Next")}</button>}
  </div>);

  if (pendingApiCall) {
    actionDiv = (<div className="d-flex justify-content-center">
      <div className="spinner-border text-black-50">
        <span className="sr-only"></span>
      </div>
    </div>);
  }

  return (
    <div className="container">
      <div className="card">
        <h3 className="card-header text-center">{t("Authors")}</h3>
        <div className="list-group list-group-flush">
          {allAuthors.map((author) => (<AuthorListItem key={author.name} author={author}>
          </AuthorListItem>))}
        </div>
        {actionDiv}
        {loadFailure && <div className="text-center text-danger"> {t("Load Failure")} </div>}
      </div>
    </div>
  );
};

export default (AuthorList);