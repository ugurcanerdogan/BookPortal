import React, { useEffect, useState } from "react";
import { Dimmer, Icon, Image, Loader, Menu, Message, Segment, Table } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useApiProgress } from "../../utilities/apiProgress";
import UserService from "../../services/UserService";
import defaultPicture from "../../assets/userImage.png";
import { useTranslation } from "react-i18next";

const UserList = () => {

  const { t } = useTranslation();
  const { username } = useSelector(state => state.auth);
  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });
  const { content: allUsers, last, first } = page;
  const [loadFailure, setLoadFailure] = useState(false);
  const pendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/users/with-jpa-pagination?pageNumber");
  const { searchItem } = useParams();

  useEffect(() => {
    loadUsers(searchItem, username);
  }, []);

  const onClickNext = () => {
    const prevPage = page.number + 1;
    loadUsers(searchItem, username, prevPage);
  };

  const onClickPrevious = () => {
    const nextPage = page.number - 1;
    loadUsers(searchItem, username, nextPage);
  };

  const loadUsers = (searchItem, loggedInUsername, pageNumber, pageSize) => {
    const userService = new UserService();
    setLoadFailure(false);
    if (searchItem) {
      userService.getUsersWithName(searchItem, loggedInUsername, pageNumber, pageSize).then(response => {
        setPage(response.data);
      }).catch(error => {
        setLoadFailure(true);
      });
    } else {
      userService.getUsersWithPagination(loggedInUsername, pageNumber, pageSize).then(response => {
        setPage(response.data
          // users: response.data
        );
      }).catch(error => {
        setLoadFailure(true);
      });
    }
  };

  let notOnlyOnePage = last && first;

  let loadFail = (
    <Message negative>
      <Message.Header>{t("We couldn't load the users...")}</Message.Header>
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
        <Table color="yellow" celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>{t("Name-Surname")}</Table.HeaderCell>
              <Table.HeaderCell>{t("E-mail")}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allUsers.map((user) => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/users/view/${user.username}`}>
                    <Image centered size="mini" src={defaultPicture}></Image>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/users/view/${user.username}`}>
                    {user.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/users/view/${user.username}`}>
                    {user.username}
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

export default UserList;