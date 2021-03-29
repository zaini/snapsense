import {React, createContext} from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import NavbarMenuItems from '../components/utils/NavbarMenuItems';
import MainNavbar from '../components/utils/MainNavbar';
import HomeLayout from '../pages/Home/HomeLayout';
import { AuthContext } from "../context/auth";
import { Route} from "react-router";

const admin = {
  user: {accountType: "ADMIN"}
};
  
const doctor = {
  user: {accountType: "DOCTOR"}
};

const patient = {
  user: {accountType: "PATIENT"}
};

const notLoggedIn = {
  user: {accountType: ""}
};
