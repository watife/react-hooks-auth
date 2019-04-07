import React, { useState } from "react";
import axios from "axios";

const initialState = {
  email: "",
  password: ""
};
const Login = props => {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onHandleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    userFetch();
  };

  const userFetch = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8003/api/v1/auth/login",
        user
      );

      localStorage.setItem("cool-permit", response.data.token);
      props.history.push("/");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <form
        style={{ width: "60%", margin: "10px auto", marginBottom: "10px" }}
        onSubmit={onSubmit}
      >
        <input
          type="email"
          name="email"
          style={{ display: "block", marginBottom: "10px", width: "70%" }}
          onChange={onHandleChange}
          value={user.email}
        />
        <input
          type="password"
          name="password"
          style={{ display: "block", marginBottom: "10px", width: "70%" }}
          onChange={onHandleChange}
          value={user.password}
        />
        <button disabled={loading}>{loading ? "loading..." : "Submit"}</button>
      </form>
      {error && <div>{error}</div>}
    </>
  );
};

export default Login;
