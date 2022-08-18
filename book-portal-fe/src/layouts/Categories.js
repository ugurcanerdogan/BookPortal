import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Categories = () => {

  const { t } = useTranslation();

  return (
    <div>
      <Menu pointing vertical>
        <Menu.Item as={Link} to="/books" >
          <Icon name="book"/>
          {t("Books")}</Menu.Item>
        <Menu.Item as={Link} to="/users" >
          <Icon name="users"/>
          {t("Users")}</Menu.Item>
        <Menu.Item as={Link} to="/authors" >
          <Icon name="pencil"/>
          {t("Authors")}</Menu.Item>
      </Menu>
    </div>
  );
};

export default Categories;