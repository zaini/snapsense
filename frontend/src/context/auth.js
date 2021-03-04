import React, { createContext, useReducer } from "react";
import { decode } from "jsonwebtoken";

const initialState = {
  user: null,
};

const updateUser = () => {
  if (localStorage.getItem("jwtToken")) {
    const decodedToken = decode(localStorage.getItem("jwtToken"));
    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      initialState.user = decodedToken;
    }
  }
  return initialState.user;
};

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.accessToken,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      break;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.accessToken);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: updateUser(), login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
