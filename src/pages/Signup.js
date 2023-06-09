import React from "react";
import { GlobalCtx } from "../App";

const Signup = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url } = gState;

  const blank = {
    username: "",
    password: "",
    email: "",
  };

  const [form, setForm] = React.useState(blank);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const { username, password, email } = form;
    // SIGNUP
    fetch(`${url}/auth/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setForm(blank);
        props.history.push("/login");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
