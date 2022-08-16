import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import AuthorService from "../../services/AuthorService";
import authorImage from "../../assets/authorImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AuthorDetail = () => {

  const { isAdmin } = useSelector(state => state.auth);
  const { t } = useTranslation();
  const [author, setAuthor] = useState({});
  const [editable, setEditable] = useState(false);
  let routeParams = useParams();
  const pathAuthorInfo = routeParams.name;

  useEffect(() => {
    let authorService = new AuthorService();
    authorService.getAuthorByEmail(pathAuthorInfo).then(author => setAuthor(author.data));
  }, []);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);


  return (<div>
    <Card fluid>
      <Image src={authorImage} size="medium" centered />
      <Card.Content>
        <Card.Header>{author.name}</Card.Header>
        <Card.Meta>
          <span>{author.gender}</span>
        </Card.Meta>
        <Card.Description>
          {author.email}
        </Card.Description>
      </Card.Content>
      {editable &&
        <Link to={`/authors/edit/${author.name}`}>
          <Button color="pink">Edit Author</Button>
        </Link>}

    </Card>
  </div>);
};

export default AuthorDetail;