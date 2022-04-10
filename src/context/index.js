import React, { useState, useEffect, useContext } from "react";

import * as cognito from "../lib/cognito";

import { getExpenses, addExpense, deleteExpense } from "../services";

export const AuthStatus = {
  Loading: "Loading",
  SignedIn: "SignedIn",
  SignedOut: "SignedOut",
};

Object.freeze(AuthStatus);

const defaultState = {
  sessionInfo: {},
  authStatus: AuthStatus.Loading,
  data: null,
  loading: false,
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  const [sessionInfo, setSessionInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session = await getSession();
        setSessionInfo({
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
        });
        window.localStorage.setItem(
          "accessToken",
          `${session.accessToken.jwtToken}`
        );
        window.localStorage.setItem(
          "refreshToken",
          `${session.refreshToken.token}`
        );
        setAuthStatus(AuthStatus.SignedIn);
      } catch (err) {
        setAuthStatus(AuthStatus.SignedOut);
      }
    }
    getSessionInfo();
  }, [setAuthStatus, authStatus]);

  useEffect(() => {
    getExpenseData();
  }, []);

  const getExpenseData = async () => {
    setLoading(true);
    try {
      await getExpenses()
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const dataTransform = data.Items.map((item) => {
            return Object.keys(item).reduce((acc, itemE) => {
              acc[itemE] = item[itemE].S || item[itemE].N;
              return acc;
            }, {});
          });
          setData(dataTransform);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const addExpenseItem = async (expense) => {
    setLoading(true);
    const d = {
      date: expense.date,
      expenseType: expense.type,
      expenseId: expense.id,
      expense: expense.amount,
    };
    const updatedData = [...data, d];
    await addExpense(expense)
      .then((res) => res.json())
      .then((res) => {
        setData(updatedData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteExpenseItem = async (id) => {
    setLoading(true);
    const updatedData = data.filter((d) => d.expenseId !== id);
    await deleteExpense(id)
      .then((res) => res.json())
      .then((res) => {
        setData(updatedData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  if (authStatus === AuthStatus.Loading) {
    return null;
  }

  async function signInWithEmail(username, password) {
    try {
      await cognito.signInWithEmail(username, password);
      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  }

  async function signUpWithEmail(username, email, password) {
    try {
      await cognito.signUpUserWithEmail(username, email, password);
    } catch (err) {
      throw err;
    }
  }

  function signOut(navigate) {
    cognito.signOut();
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    setAuthStatus(AuthStatus.SignedOut);
    navigate("/");
  }

  async function verifyCode(username, code) {
    try {
      await cognito.verifyCode(username, code);
    } catch (err) {
      throw err;
    }
  }

  async function getSession() {
    try {
      const session = await cognito.getSession();
      return session;
    } catch (err) {
      throw err;
    }
  }

  const state = {
    authStatus,
    sessionInfo,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    verifyCode,
    getSession,
    loading,
    data,
    deleteExpenseItem,
    addExpenseItem,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
