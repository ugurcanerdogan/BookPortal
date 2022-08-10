import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/v1/registration", body);
};

export const login = (creds) => {
  const params = new URLSearchParams(creds)
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return axios.post("/api/v1/login", params, config)
}