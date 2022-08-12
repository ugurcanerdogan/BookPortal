import React, { useEffect, useState } from "react";
import BookCard from "../components/Book/BookCard";
import { getBook } from "../api/apiCalls";
import { useTranslation } from "react-i18next";


const BookPage = (props) => {
  const [book, setBook] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setNotFound(false);
  }, [book]);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await getBook(props.match.params.isbn);
        setBook(response.data);

      } catch (e) {
        setNotFound(true);
      }
    };
    loadBook();
  }, [props.match.params.isbn]);

  if (notFound) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: 48, color: "red" }}>error</i>
          </div>
          {t("Book not found!")}
        </div>
      </div>
    );
  }

  return (<div className="container">
    <BookCard book={book} />
  </div>);
};

export default BookPage;