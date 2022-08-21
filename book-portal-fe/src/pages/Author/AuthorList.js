import React, { useEffect, useState } from "react";
import { Dimmer, Icon, Image, Loader, Menu, Message, Segment, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useApiProgress } from "../../utilities/apiProgress";
import AuthorService from "../../services/AuthorService";
import defaultPicture from "../../assets/authorImage.png";
import { useTranslation } from "react-i18next";

const AuthorList = () => {

  const { t } = useTranslation();
  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });
  const { content: allAuthors, last, first } = page;
  const [loadFailure, setLoadFailure] = useState(false);
  const pendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/authors/with-jpa-pagination?pageNumber");

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
    const authorService = new AuthorService();
    setLoadFailure(false);
    authorService.getAuthorsWithPagination(pageNumber, pageSize).then(response => {
      setPage(response.data);
    }).catch(error => {
      setLoadFailure(true);
    });
  };

  let notOnlyOnePage = last && first;

  let loadFail = (
    <Message negative>
      <Message.Header>{t("We couldn't load the authors...")}</Message.Header>
      <p>{t("Error occurred...")}</p>
    </Message>
  );

  let actionDiv = (<Table.Footer>
    <Table.Row>
      <Table.HeaderCell colSpan="3">
        <Menu floated="right" pagination>
          {first === false && <Menu.Item onClick={onClickPrevious} as="a" icon>
            <Icon name="chevron left" />
          </Menu.Item>}
          {last === false && <Menu.Item onClick={onClickNext} as="a" icon>
            <Icon name="chevron right" />
          </Menu.Item>}
        </Menu>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>);

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

  // USER FOTO EKLENECEK
  return (
    !loadFailure ?
      <div>
        <Table color="pink" celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>{t("Name-Surname")}</Table.HeaderCell>
              <Table.HeaderCell>{t("E-mail")}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allAuthors.map((author) => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/authors/view/${author.name}`}>
                    <Image centered size="mini" src={defaultPicture}></Image>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/authors/view/${author.name}`}>
                    {author.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/authors/view/${author.name}`}>
                    {author.email}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          {!notOnlyOnePage && actionDiv}
        </Table>
        {loadFailure && loadFail}
      </div>
      : loadFail
  );
};

export default AuthorList;