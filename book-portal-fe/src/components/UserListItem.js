import React from "react";
import defaultPicture from "../assets/userImage.png";
import { Link } from "react-router-dom";

const UserListItem = (props) => {

  const { user } = props;
  const { username, name, image } = user;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }
  return (
    <Link to={`/users/${username}`} className="list-group-item list-group-item-action">
      <img className="rounded-circle" width="32" height="32" alt="userImage" src={imageSource} />
      <span className="ps-2">{name} - {username}</span>
    </Link>
  );
};

export default UserListItem;