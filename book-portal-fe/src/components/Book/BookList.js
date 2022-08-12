import React, { useEffect, useState } from "react";
import { getBooksWithPagination } from "../../api/apiCalls";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../../shared/ApiProgress";
import BookListItem from "../../components/Book/BookListItem";

const BookList = () => {

  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress("get", "/api/v1/books/with-jpa-pagination?pageNumber");


  useEffect(() => {
    loadBooks();
  }, []);

  const onClickNext = () => {
    const prevPage = page.number + 1;
    loadBooks(prevPage);
  };

  const onClickPrevious = () => {
    const nextPage = page.number - 1;
    loadBooks(nextPage);
  };

  const loadBooks = (pageNumber, pageSize) => {
    setLoadFailure(false);
    getBooksWithPagination(pageNumber, pageSize).then(response => {
      setPage(response.data
        // users: response.data
      );
    }).catch(error => {
      setLoadFailure(true);
    });
  };

  const { t } = useTranslation();
  const { content: allBooks, last, first } = page;

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

  return (<div className="card">
    <h3 className="card-header text-center">{t("Books")}</h3>
    <div className="list-group list-group-flush">
      {allBooks.map((book) => (<BookListItem key={book.isbn} book={book}>
      </BookListItem>))}
    </div>
    {actionDiv}
    {loadFailure && <div className="text-center text-danger"> {t("Load Failure")} </div>}
  </div>);
};

export default (BookList);