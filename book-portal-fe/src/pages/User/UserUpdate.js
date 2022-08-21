import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserHandler } from "../../store/actions/authActions";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import userImage from "../../assets/userImage.png";
import UserService from "../../services/UserService";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";


export const UserUpdate = (props) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialValues = { name: "", password: "" };
  const [user, setUser] = useState({});
  const routeParams = useParams();
  const pathUserName = routeParams.username;
  const userService = new UserService();
  const { sub: loggedInUsername } = useSelector(state => state.auth);

  //update user by username eklenecek ayrı fonka ve submite
  useEffect(() => {
    userService.getUserByUsername(pathUserName).then(user => setUser(user.data));
  }, []);


  const onSubmit = async (values) => {
    for (var propName in values) {
      if (values[propName] === null || values[propName] === undefined) {
        delete values[propName];
      }
    }
    const { history } = props;
    const { push } = history;

    try {
      const response = await userService.updateUser(user.id, values);
      setUser(response);
      toast.success(t("User updated!"), { autoClose: 500 });
      if (pathUserName === loggedInUsername) {
        dispatch(refreshUserHandler(response.data.name));
      }
      push("/users");
    } catch (apiError) {
      toast.error(t("Update failed..."), { autoClose: 750 });
    }
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="users" circular />
      <Header.Content>{t("Update User")}</Header.Content>
    </Header>

    <Card fluid>
      <Image src={userImage} size="medium" centered />
      <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Description>
          {t("Additional info")}
        </Card.Description>
      </Card.Content>
    </Card>

    <Formik initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="name" placeholder={t("Name-Surname")}></UqiTextInput>
        <UqiTextInput name="password" placeholder={t("Password")} type="password"></UqiTextInput>
        <Button color="yellow" type="submit">{t("Update")}</Button>
      </Form>
    </Formik>
  </div>);
};

export default UserUpdate;