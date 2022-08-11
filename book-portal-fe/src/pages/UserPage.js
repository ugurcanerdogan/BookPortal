import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { getUser } from "../api/apiCalls";
import { useTranslation } from "react-i18next";


const UserPage = (props) => {
  const [user, setUser] = useState();
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setNotFound(false);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(props.match.params.username);
        setUser(response.data);

      } catch (e) {
        setNotFound(true);
      }
    };
    loadUser();
  }, [props.match.params.username]);

  if (notFound) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: 48, color: "red" }}>error</i>
          </div>
          {t("User not found!")}
        </div>
      </div>
    );
  }

  return (<div className="container">
    <ProfileCard />
  </div>);
};

export default UserPage;