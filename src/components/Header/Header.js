import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";
import { AuthContext } from "../context/UserContext";
import "./Header.css";

const Header = () => {
  const { user, logOut, setUser } = useContext(AuthContext);
  const logoutHandler = () => {
    logOut().then((result) => {
      setUser(null);
      console.log("LogOut Success");
    });
  };
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/about">About</Link>

        {user?.uid ? (
          <>
            <Link>{user?.email}</Link>
            <button className="btn btn-danger" onClick={logoutHandler}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
