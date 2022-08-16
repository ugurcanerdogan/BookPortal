import axios from "axios";

export default class AuthorService {

  getAuthorByEmail = (authorName) => {
    return axios.get(`http://localhost:8080/api/v1/authors/by-author-name?authorName=${authorName}`);
  };

  getAuthors = () => {
    return axios.get("http://localhost:8080/api/v1/authors");
  };

  getAuthorsWithPagination = (pageNumber = 0, pageSize = 4) => {
    return axios.get(`http://localhost:8080/api/v1/authors/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  };

  updateAuthor = (bookId, body) => {
    return axios.put(`http://localhost:8080/api/v1/authors/${bookId}`, body);
  };

  addAuthor = (body) => {
    return axios.post(`http://localhost:8080/api/v1/authors`, body);
  };
}