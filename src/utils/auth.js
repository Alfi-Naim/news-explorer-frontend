import api from "./MainApi";

export const BASE_URL = "https://api.naim-news.students.nomoredomainssbs.ru";
//export const BASE_URL = "http://localhost:3001";

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  }).then(api._handleResponse);
}

export const signup = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name })
  }).then(api._handleResponse);
}
