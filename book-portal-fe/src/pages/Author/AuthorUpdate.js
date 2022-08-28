import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import UqiTextInput from "../../utilities/customFormControls/UqiTextInput";
import authorImage from "../../assets/authorImage.png";
import AuthorService from "../../services/AuthorService";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const AuthorUpdate = (props) => {

  const { t } = useTranslation();
  const initialValues = { name: "", password: "" };
  const [author, setAuthor] = useState({});
  const routeParams = useParams();
  const pathAuthorName = routeParams.name;
  const authorService = new AuthorService();

  useEffect(() => {
    authorService.getAuthorByEmail(pathAuthorName).then(author => setAuthor(author.data));
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
      const response = await authorService.updateAuthor(author.id, values);
      setAuthor(response);
      toast.success(t("Author updated!"), { autoClose: 500 });
      push("/authors");
    } catch (apiError) {
      toast.error(t("Update failed..."), { autoClose: 750 });
    }
  };

  return (<div>
    <Header as="h2" icon textAlign="center">
      <Icon name="write" circular />
      <Header.Content>{t("Update Author")}</Header.Content>
    </Header>

    <Card fluid>
      <Image src={authorImage} size="medium" centered />
      <Card.Content>
        <Card.Header>{author.name}</Card.Header>
        <Card.Description>
          {author.email}
        </Card.Description>
      </Card.Content>
    </Card>

    <Formik initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}>
      <Form className="ui form">
        <UqiTextInput name="name" placeholder={t("Author name")}></UqiTextInput>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <Field type="radio" name="gender" value="M" />
            {t("Male")}
          </label>
          <label style={{ marginLeft: "10px" }}>
            <Field type="radio" name="gender" value="F" />
            {t("Female")}
          </label>
        </div>
        <Button color="pink" type="submit">{t("Update")}</Button>
      </Form>
    </Formik>
  </div>);
};

export default AuthorUpdate;