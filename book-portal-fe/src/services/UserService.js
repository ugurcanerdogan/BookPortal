import axios from "axios";

export default class UserService {

  getUserByUsername = (username) => {
    return axios.get(`http://localhost:8080/api/v1/users/by-username?username=${username}`);
  };

  getUser = (userId) => {
    return axios.get(`http://localhost:8080/api/v1/users/${userId}`);
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

  addBookToReadList = (userId, bookId) => {
    return axios.post(`http://localhost:8080/api/v1/users/add-book-to-read-list?userId=${userId}&bookId=${bookId}`);
  };

  addBookToFavList = (userId, bookId) => {
    return axios.post(`http://localhost:8080/api/v1/users/add-book-to-favorite-list?userId=${userId}&bookId=${bookId}`);
  };

  removeBookFromReadList = (userId, bookId) => {
    return axios.delete(`http://localhost:8080/api/v1/users/remove-book-from-read-list?userId=${userId}&bookId=${bookId}`);
  };

  removeBookFromFavList = (userId, bookId) => {
    return axios.delete(`http://localhost:8080/api/v1/users/remove-book-from-favorite-list?userId=${userId}&bookId=${bookId}`);
  };
}