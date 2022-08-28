import axios from "axios";

export default class UserService {

  getUserByUsername = (username) => {
    return axios.get(`/api/v1/users/by-username?username=${username}`);
  };

  getUsersWithPagination = (username, pageNumber = 0, pageSize = 4) => {
    return axios.get(`/api/v1/users/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}&currentUser=${username}`);
  };

  getUsersWithName = (value) => {
    return axios.get(`/api/v1/users/all-by-contains-name?name=${value}`);
  };

  updateUser = (userId, body) => {
    return axios.put(`/api/v1/users/${userId}`, body);
  };

  addUser = (body) => {
    return axios.post(`/api/v1/users`, body);
  };

  deleteUser = (id) => {
    return axios.delete(`/api/v1/users/${id}`);
  };

  addBookToReadList = (userId, bookId) => {
    return axios.post(`/api/v1/users/add-book-to-read-list?userId=${userId}&bookId=${bookId}`);
  };

  addBookToFavList = (userId, bookId) => {
    return axios.post(`/api/v1/users/add-book-to-favorite-list?userId=${userId}&bookId=${bookId}`);
  };

  removeBookFromReadList = (userId, bookId) => {
    return axios.delete(`/api/v1/users/remove-book-from-read-list?userId=${userId}&bookId=${bookId}`);
  };

  removeBookFromFavList = (userId, bookId) => {
    return axios.delete(`/api/v1/users/remove-book-from-favorite-list?userId=${userId}&bookId=${bookId}`);
  };
}