import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Dimmer, Grid, Header, Icon, Image, List, Loader, Message, Segment } from "semantic-ui-react";
import AuthorService from "../../services/AuthorService";
import bookPicture from "../../assets/bookImage.png";
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
  const [bookList, setBookList] = useState([]);
  const [loadFailure, setLoadFailure] = useState(false);
  const authorService = new AuthorService();
  const { history } = props;
  const { push } = history;
  const { name } = useParams();
  const pendingApiCall = useApiProgress("get", "/api/v1/authors/by-author-name?authorName=");

  useEffect(() => {
    setLoadFailure(false);
    authorService.getAuthorByEmail(name).then(author => {
      setAuthor(author.data);
      setBookList(author.data.books);
    }).catch(error => setLoadFailure(true));
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

  let emptyList = (
    <Message info>
      <Message.Header>{t("The list is empty.")}</Message.Header>
      <p>{t("This author has no books?")}</p>
    </Message>
  );


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
        {
          <Grid stackable columns={1}>
            <Grid.Column>
              <Segment>
                <Header color="green" as="h4" icon block textAlign="center">
                  <Icon name="book" circular />
                  <Header.Content>{t("Author's Books")}</Header.Content>
                </Header>
                <List celled animated verticalAlign="middle">
                  {bookList.length !== 0 ? bookList.map((book, index) => (
                    <List.Item key={index}>
                      <Image avatar src={bookPicture} />
                      <List.Content as={Link} to={"/books/view/" + book.isbn}>
                        <List.Header>{book.title}</List.Header>
                      </List.Content>
                    </List.Item>
                  )) : emptyList}
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
        }
      </div>
      : loadFail
  );
};

export default AuthorDetail;