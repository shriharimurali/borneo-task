import { API_URLS } from "../constant/urlConstants";

export const getAccessToken = () => {
  return window.localStorage.getItem("accessToken");
};

export const getExpenses = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  const res = fetch(API_URLS.baseUrl, requestOptions);
  return res;
};

export const addExpense = async (data) => {
  // const data = { id: 4, date: "29-01-2019", amount: 1000, type: "Food" };
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  };
  const res = fetch(API_URLS.baseUrl, requestOptions);
  return res;
};

export const deleteExpense = async (expenseId) => {
  const data = { expenseId };
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  };
  const res = fetch(API_URLS.baseUrl, requestOptions);
  return res;
};
