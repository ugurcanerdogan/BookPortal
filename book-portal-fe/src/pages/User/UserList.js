import React, { useEffect, useState } from "react";
import { Dimmer, Icon, Image, Loader, Menu, Message, Segment, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useApiProgress } from "../../utilities/apiProgress";
import UserService from "../../services/UserService";
import defaultPicture from "../../assets/userImage.png";

const UserList = () => {

  // const { t } = useTranslation();

  const { username } = useSelector(state => state.auth);

  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });

  const { content: allUsers, last, first } = page;

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress("get", "https://localhost:8080/api/v1/users/with-jpa-pagination?pageNumber");


  useEffect(() => {
    loadUsers(username);
  }, []);

  const onClickNext = () => {
    const prevPage = page.number + 1;
    loadUsers(username, prevPage);
  };

  const onClickPrevious = () => {
    const nextPage = page.number - 1;
    loadUsers(username, nextPage);
  };

  const loadUsers = (loggedInUsername, pageNumber, pageSize) => {
    const userService = new UserService();
    setLoadFailure(false);
    userService.getUsersWithPagination(loggedInUsername, pageNumber, pageSize).then(response => {
      setPage(response.data
        // users: response.data
      );
    }).catch(error => {
      setLoadFailure(true);
    });
  };

  let notOnlyOnePage = last && first;

  let loadFail = (
    <Message negative>
      <Message.Header>We're sorry we can't load the users.</Message.Header>
      <p>Error occured...</p>
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
    actionDiv = (<Segment>
      <Dimmer active>
        <Loader size="large">Loading</Loader>
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>);
  }

  // USER FOTO EKLENECEK
  return (
    !loadFailure ?
      <div>
        <Table color="yellow" celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Name-Surname</Table.HeaderCell>
              <Table.HeaderCell>E-Mail</Table.HeaderCell>
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