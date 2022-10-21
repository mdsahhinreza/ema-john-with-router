import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import "./SignUp.css";
const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser, setUser, signUpWithGoogle } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password.length < 6) {
      setError("Password Should be must 6 charecter");
      return;
    }

    if (password !== confirm) {
      setError("Your Password Did not Match");
      return;
    }

    // console.log(email, password, confirm);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setSuccess("User Created Successfull");
        form.reset();
        // console.log(user);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  const handleGoogleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setSuccess("User Created Successfull");
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };
  return (
    <div>
      <div className="form-container">
        <h2 className="form-title"> Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Emial</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" name="confirm" required />
          </div>
          <p className="error">{error}</p>
          <p className="success">{success}</p>
          <button className="btn-submit" type="submit">
            Sign In
          </button>
        </form>
        <div className="text-center">
          <button onClick={handleGoogleSignUp}>Sign In with Google</button>
        </div>
        <p className="text-center">
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
