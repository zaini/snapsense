import {React, createContext} from 'react';
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import NavbarMenuItems from '../components/utils/NavbarMenuItems';
import MainNavbar from '../components/utils/MainNavbar';
// import { AuthContext } from "../context/auth";

// test('renders without crashing', () => {
//   const renderNavbarItems = render(<BrowserRouter><NavbarMenuItems/></BrowserRouter>);
//   expect(renderNavbarItems).toBeTruthy()
// })

const AuthContext = createContext();
// Setup mock
const AuthProvider = ({ children }) => {
  
}
// 

test("mock hook", () => {
    // useContextMock.mockReturnValue(mockData);
  const {getByTestId} = render(
    // <AuthContext.Provider>
      <AuthContext.Consumer value={{
        user: {accountType: 'ADMIN'},
        login: () => {},
        logout: () => {},
      }}>
        {() => {
          <BrowserRouter><MainNavbar /></BrowserRouter>
        }}
      </AuthContext.Consumer>
    // </AuthContext.Provider>
  );
  expect(getByTestId('myDash').textContent).toEqual('My Dashboard');
});