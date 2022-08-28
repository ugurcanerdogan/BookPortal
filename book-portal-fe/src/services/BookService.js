import axios from "axios";

export default class BookService {

  getBookByIsbn = (isbn) => {
    return axios.get(`/api/v1/books/by-isbn?isbn=${isbn}`);
  };

  getBooksWithPagination = (pageNumber = 0, pageSize = 6) => {
    return axios.get(`/api/v1/books/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  };

  getBookWithTitle = (value) => {
    return axios.get(`/api/v1/books/all-by-contains-title?bookTitle=${value}`);
  };

  updateBook = (bookId, body) => {
    return axios.put(`/api/v1/books/${bookId}`, body);
  };

  addBook = (body) => {
    return axios.post(`/api/v1/books`, body);
  };

  deleteBook = (id) => {
    return axios.delete(`/api/v1/books/${id}`);
  };

  getUsersAddedToReadList = (id) => {
    return axios.get(`/api/v1/books/${id}/getUsersAddedThisToReadingList`);
  };

  getUsersAddedToFavList = (id) => {
    return axios.get(`/api/v1/books/${id}/getUsersAddedThisToFavoriteList`);
  };

  getAuthorOfBook = (id) => {
    return axios.get(`/api/v1/books/${id}/getAuthors`);
  };
}