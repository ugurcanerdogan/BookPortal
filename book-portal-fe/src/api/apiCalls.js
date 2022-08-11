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

export const getUsersWithPagination = (username, pageNumber = 0, pageSize = 4) => {
  return axios.get(`/api/v1/users/with-jpa-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}&currentUser=${username}`);
};

export const getBooks = (token) => {
  return axios.get("/api/v1/books");
};

export const getAuthors = (token) => {
  return axios.get("/api/v1/authors");
};