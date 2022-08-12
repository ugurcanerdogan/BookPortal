import React from "react";
import defaultPicture from "../../assets/authorImage.png";
import { Link } from "react-router-dom";

const AuthorListItem = (props) => {

  const { author } = props;
  const { name, email, gender, image } = author;

  const authorNames = [];
  //authors.forEach((author) => authorNames.push(author.name));

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }
  return (
    <Link to={`/authors/${name}`} className="list-group-item list-group-item-action">
      <img className="rounded-circle" width="32" height="32" alt="authorImage" src={imageSource} />
      <span className="ps-2">{name}</span>
      {/*<span className="ps-2">{title} - {authorNames.map((authorName,index) => (<AuthorName key={authorName.index} authorName={authorName}></AuthorName>))}</span>*/}

    </Link>
  );
};

export default AuthorListItem;