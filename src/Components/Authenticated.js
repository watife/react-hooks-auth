/**
 * Dependencies
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

/**
 * Helpers
 */
import { getJwt, removeJwt } from "../Helpers/jwt.helpers";
import { setAuthToken } from "../Helpers/headers.helpers";

/**
 * Context
 */
import UserContext from "../Contexts/User.context";

function Authenticated(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const jwt = getJwt();

      if (!jwt) {
        return props.history.push("/login");
      }

      setAuthToken(jwt);

      // decode token and get user info and experation
      const decoded = jwt_decode(jwt);

      console.log(decoded.user);

      const response = await axios.post("http://localhost:8003/api/v1/user/", {
        email: decoded.user.email
      });

      setUser(response.data.data);

      //   auto logout if expired
      autoLogOut(decoded);
    } catch (error) {
      if (error.response.status === 401) {
        removeJwt();
        return props.history.push("/login");
      } else if (error.response.status === 500) {
        return props.history.push("/500");
      } else if (error.response.status === 400) {
        removeJwt();
        return props.history.push("/login");
      }
    }
  };

  const autoLogOut = decoded => {
    // check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // remove jwt
      removeJwt();
      // Logout user
      setAuthToken(false);
      // clear current user
      setUser(null);
      // redirect to login
      return props.history.push("/login");
    }
  };

  if (!user) {
    return <>Loading</>;
  }

  return (
    <>
      <UserContext.Provider value={{ user }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
}

export default withRouter(Authenticated);
