import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Dimmer, Image, Loader, Message, Segment } from "semantic-ui-react";
import AuthorService from "../../services/AuthorService";
import authorImage from "../../assets/authorImage.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useApiProgress } from "../../utilities/apiProgress";

const AuthorDetail = (props) => {

  const { t } = useTranslation();
  const { isAdmin } = useSelector(state => state.auth);
  const [author, setAuthor] = useState({});
  const [editable, setEditable] = useState(false);
  const [loadFailure, setLoadFailure] = useState(false);
  const authorService = new AuthorService();
  const { history } = props;
  const { push } = history;
  const { name } = useParams();
  const pendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/authors/by-author-name?authorName=");

  useEffect(() => {
    setLoadFailure(false);
    authorService.getAuthorByEmail(name).then(author => setAuthor(author.data)).catch(error => setLoadFailure(true));
  }, []);

  useEffect(() => {
    setEditable(isAdmin);
  }, [isAdmin]);

  const deleteAuthor = () => {
    authorService.deleteAuthor(author.id).then(() => setAuthor({}));
    toast.success(t("Author deleted!"), { autoClose: 500 });
    push("/authors");
  };

  let loadFail = (
    <Message negative>
      <Message.Header>{t("We couldn't load the author...")}</Message.Header>
      <p>{t("Error occurred...")}</p>
    </Message>
  );

  if (pendingApiCall) {
    return (
      (<Segment>
          <Dimmer active inverted>
            <Loader inverted content={t("Loading")} />
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      )
    );
  }

  return (
    !loadFailure ?
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
                <Button icon="edit" content={t("Edit Author")} color="purple" />
              </Link>
              <Button icon="trash" onClick={deleteAuthor} content={t("Delete Author")} color="purple" />
            </div>
          }
        </Card>
      </div>
      : loadFail
  );
};

export default AuthorDetail;