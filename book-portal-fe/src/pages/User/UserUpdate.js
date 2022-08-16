import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserHandler } from "../../store/actions/authActions";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import userImage from "../../assets/userImage.png";
import UserService from "../../services/UserService";


export const UserUpdate = (props) => {

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
    const response = await userService.updateUser(user.id, values);
    setUser(response);
    if (pathUserName === loggedInUsername) {
      dispatch(refreshUserHandler(response.data.name));
    }
    push("/users");
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="users" circular />
      <Header.Content>Update User</Header.Content>
    </Header>

    <Card fluid>
      <Image src={userImage} size="medium" centered />
      <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
    </Card>

    <Formik initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="name" placeholder="İsim-Soyisim"></UqiTextInput>
        <UqiTextInput name="password" placeholder="Şifre" type="password"></UqiTextInput>
        <Button color="yellow" type="submit">Save</Button>
      </Form>
    </Formik>
  </div>);
};

export default UserUpdate;