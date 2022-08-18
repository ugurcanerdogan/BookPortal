import axios from "axios";

export default class UserService {

  getUserByUsername = (username) => {
    return axios.get(`http://localhost:8080/api/v1/users/by-username?username=${username}`);
  };

  getUsers = () => {
    return axios.get("http://localhost:8080/api/v1/users/");
  };

  getUsersWithPagination = (username, pageNumber = 0, pageSize = 4) => {
    return axios.get(`http://localhost:8080/api/v1/users/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}&currentUser=${username}`);
  };

  getUsersWithName = (containsName, username, pageNumber = 0, pageSize = 4) => {
    return axios.get(`http://localhost:8080/api/v1/users/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}&currentUser=${username}`);
  };

  updateUser = (userId, body) => {
    return axios.put(`http://localhost:8080/api/v1/users/${userId}`, body);
  };

  addUser = (body) => {
    return axios.post(`http://localhost:8080/api/v1/users`, body);
  };

  deleteUser = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/users/${id}`);
  };
}