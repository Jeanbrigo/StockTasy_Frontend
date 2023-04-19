import React from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";

const Header = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);

  const logout = (
    <Link>
      <h2
        onClick={() => {
          window.localStorage.removeItem("token");
          setGState({ ...gState, token: null });
        }}
      >
        Log out
      </h2>
    </Link>
  );

  return (
    <nav>
      <Link to="/signup">
        <h2>Sign up</h2>
      </Link>
      <Link to="/login">
        <h2>Log in</h2>
      </Link>
      {gState.token ? logout : null}
    </nav>
  );
};

export default Header;
