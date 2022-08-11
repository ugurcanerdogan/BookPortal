import React, { useEffect, useState } from "react";
import { getUsersWithPagination } from "../api/apiCalls";
import { useTranslation } from "react-i18next";
import UserListItem from "../components/UserListItem";
import { useSelector } from "react-redux";
import { useApiProgress } from "../shared/ApiProgress";

const UserList = () => {

  const [page, setPage] = useState({
    content: [], size: 4, number: 1
  });

  const { username } = useSelector(store => ({
    username: store.username
  }));

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress("/api/v1/users/with-jpa-pagination?pageNumber");


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
    setLoadFailure(false);
    getUsersWithPagination(loggedInUsername, pageNumber, pageSize).then(response => {
      setPage(response.data
        // users: response.data
      );
    }).catch(error => {
      setLoadFailure(true);

    });
  };

  const { t } = useTranslation();
  const { content: allUsers, last, first } = page;

  let actionDiv = (<div>
    {first === false &&
      <button onClick={onClickPrevious} className="btn btn-sm btn-light float-start">{t("Previous")}</button>}
    {last === false && <button onClick={onClickNext} className="btn btn-sm btn-light float-end">{t("Next")}</button>}
  </div>);

  if (pendingApiCall) {
    actionDiv = (<div className="d-flex justify-content-center">
      <div className="spinner-border text-black-50">
        <span className="sr-only"></span>
      </div>
    </div>);
  }
  return (<div className="card">
    <h3 className="card-header text-center">{t("Users")}</h3>
    <div className="list-group list-group-flush">
      {allUsers.map((user) => (<UserListItem key={user.username} user={user}>
      </UserListItem>))}
    </div>
    {actionDiv}
    {loadFailure && <div className="text-center text-danger"> {t("Load Failure")} </div>}
  </div>);
};

export default (UserList);