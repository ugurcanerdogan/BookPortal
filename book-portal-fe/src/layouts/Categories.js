import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Categories = () => {

  return (
    <div>
      <Menu pointing vertical>
        <Menu.Item as={Link} to="/books" name="Books"></Menu.Item>
        <Menu.Item as={Link} to="/users" name="Users"></Menu.Item>
        <Menu.Item as={Link} to="/authors" name="Authors"></Menu.Item>
      </Menu>
    </div>
  );
};

export default Categories;