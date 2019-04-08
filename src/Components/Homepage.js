import React, { useContext } from "react";

/**
 * Contexts
 */
import UserContext from "../Contexts/User.context";

function Homepage() {
  const { user } = useContext(UserContext);
  console.log(user);
  return <>{user.id}</>;
}

export default Homepage;
