import React from "react";
import defaultPicture from "../../assets/bookImage.png";
import { Link } from "react-router-dom";

const BookListItem = (props) => {

  const { book, authors } = props;
  const { title, year, publisher, isbn, image } = book;

  const authorNames = [];
  //authors.forEach((author) => authorNames.push(author.name));

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }
  return (
    <Link to={`/books/${isbn}`} className="list-group-item list-group-item-action">
      <img className="rounded-circle" width="32" height="32" alt="userImage" src={imageSource} />
      <span className="ps-2">{title} - Yazarİsmi</span>
      {/*<span className="ps-2">{title} - {authorNames.map((authorName,index) => (<AuthorName key={authorName.index} authorName={authorName}></AuthorName>))}</span>*/}

    </Link>
  );
};

export default BookListItem;