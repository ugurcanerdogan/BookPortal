import axios from "axios";

export default class BookService {

  getBookByIsbn = (isbn) => {
    return axios.get(`http://localhost:8080/api/v1/books/by-isbn?isbn=${isbn}`);
  };

  getBooksWithPagination = (pageNumber = 0, pageSize = 6) => {
    return axios.get(`http://localhost:8080/api/v1/books/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  };

  getBookWithTitle = (value) => {
    return axios.get(`http://localhost:8080/api/v1/books/all-by-contains-title?bookTitle=${value}`);
  };

  updateBook = (bookId, body) => {
    return axios.put(`http://localhost:8080/api/v1/books/${bookId}`, body);
  };

  addBook = (body) => {
    return axios.post(`http://localhost:8080/api/v1/books`, body);
  };

  deleteBook = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/books/${id}`);
  };
}