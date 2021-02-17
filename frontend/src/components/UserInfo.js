import React from "react";
import { withRouter } from 'react-router-dom';

const UserInfo = (props) => {
  return (
    <div className="UserInfo">
      <h1>Your information</h1>
      <div>
        <label for="fistname">First name</label>
        <p>{props.firstName}</p>
      </div>
      <div>
        <label for="lastname">Last name</label>
        <p>{props.lastName}</p>
      </div>
      <div>
        <label for="email">Email</label>
        <p>{props.email}</p>
      </div>
      <button onClick={() => props.history.push("/about")}> Edit Profile </button>
    </div>
  );
}

export default withRouter(UserInfo);
