import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/v1/registration", body);
};

export const login = (creds) => {
  const params = new URLSearchParams(creds);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  return axios.post("/api/v1/login", params, config);
};

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Bearer ${token}`;
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};
export const getUsers = () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   }
  // }
  return axios.get("/api/v1/users");
};

export const getUser = (username) => {
  return axios.get(`/api/v1/users/by-username?username=${username}`);
};

export const getAuthor = (authorName) => {
  return axios.get(`/api/v1/authors/by-author-name?authorName=${authorName}`);
};

export const getBooksByTitle = (title) => {
  return axios.get(`/api/v1/books/all-by-contains-title?title=${title}`);
};

export const getBook = (isbn) => {
  return axios.get(`/api/v1/books/by-isbn?isbn=${isbn}`);
};

export const getUsersWithPagination = (username, pageNumber = 0, pageSize = 4) => {
  return axios.get(`/api/v1/users/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}&currentUser=${username}`);
};

export const getBooksWithPagination = (pageNumber = 0, pageSize = 4) => {
  return axios.get(`/api/v1/books/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
};

export const getAuthorsWithPagination = (pageNumber = 0, pageSize = 4) => {
  return axios.get(`/api/v1/authors/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
};

export const updateUser = (userId, body) => {
  return axios.put(`/api/v1/users/${userId}`, body);
};

export const updateBook = (bookId, body) => {
  return axios.put(`/api/v1/books/${bookId}`, body);
};

export const updateAuthor = (authorId, body) => {
  return axios.put(`/api/v1/authors/${authorId}`, body);
};

export const getBooks = (token) => {
  return axios.get("/api/v1/books");
};

export const getAuthors = (token) => {
  return axios.get("/api/v1/authors");
};