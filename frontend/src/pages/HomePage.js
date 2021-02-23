import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

const HomePage = () => {
  const context = useContext(AuthContext);

  return (
    <div>
      <h1>HOME</h1>
      {context.user
        ? [
            context.user.accountType,
            context.user.fname,
            context.user.lname,
            context.user.email,
          ]
        : "Not logged in"}
    </div>
  );
};

export default HomePage;
