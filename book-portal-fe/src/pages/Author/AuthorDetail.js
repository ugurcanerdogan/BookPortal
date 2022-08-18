import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import AuthorService from "../../services/AuthorService";
import authorImage from "../../assets/authorImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AuthorDetail = (props) => {

  const { t } = useTranslation();
  const { isAdmin } = useSelector(state => state.auth);
  const [author, setAuthor] = useState({});
  const [editable, setEditable] = useState(false);
  const authorService = new AuthorService();
  const { history } = props;
  const { push } = history;
  const { name } = useParams();

  useEffect(() => {
    authorService.getAuthorByEmail(name).then(author => setAuthor(author.data));
  }, []);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);

  const deleteAuthor = () => {
    authorService.deleteAuthor(author.id).then(() => setAuthor({}));
    toast.success(t("Author deleted!"), { autoClose: 500 });
    push("/authors")
  }

  return (
    <div>
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
        <div>
          <Link to={`/authors/edit/${author.name}`}>
            <Button color="yellow">
              <Icon name="edit">
              </Icon>{t("Edit Author")}
            </Button>
          </Link>
            <Button color="yellow" onClick={deleteAuthor}>
              <Icon name="trash">
              </Icon>{t("Delete Author")}
            </Button>
        </div>
      }
    </Card>
  </div>);
};

export default AuthorDetail;