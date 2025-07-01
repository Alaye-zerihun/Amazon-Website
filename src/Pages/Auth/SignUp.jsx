import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type"; // Assuming 'Type' is imported from here
import { ClipLoader } from "react-spinners";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setSetterPassword] = useState(""); // Renamed for clarity, though 'password' is fine
  const [error, setError] = useState(""); // State to store error messages
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const navgate = useNavigate();
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(user);

  const authHandler = async (e) => {
    // Removed 'action' parameter as per image
    e.preventDefault();
    setError("");

    // Based on the image, the 'action' is determined by e.target.name
    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true }); // Start sign-in loading
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: Type.SET_USER, user: userInfo.user });
      } catch (err) {
        console.error("Sign-in Error:", err);
        setError(err.message);
      } finally {
        setLoading({ ...loading, signIn: false }); // End sign-in loading
        navgate(navStateData?.state?.redirect || "/");
      }
    } else if (e.target.name === "signup") {
      // Assuming the sign-up button will have name="signup"
      setLoading({ ...loading, signUp: true }); // Start sign-up loading
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User created:", userInfo.user);
        dispatch({ type: Type.SET_USER, user: userInfo.user });
      } catch (err) {
        console.error("Sign-up Error:", err);
        setError(err.message);
      } finally {
        setLoading({ ...loading, signUp: false }); // End sign-up loading
        navgate(navStateData?.state?.redirect || "/");
      }
    }
  };

  return (
    <section className={[classes.login]}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setSetterPassword(e.target.value)} // Use setSetterPassword here
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit" // Changed to type="submit" to allow form submission or keep as "button" if not submitting the form normally
            onClick={authHandler} // Call authHandler without action parameter
            name="signin" // Add name attribute for identification in authHandler
            className={classes.login_signInButton}
            disabled={loading.signIn || loading.signUp} // Disable button when loading
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        {/* Agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="submit" // Changed to type="submit"
          onClick={authHandler} // Call authHandler without action parameter
          name="signup" // Add name attribute for identification in authHandler
          className={classes.login_registerButton}
          disabled={loading.signIn || loading.signUp} // Disable button when loading
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {/* Display Error Message */}
        {error && <small className={classes.errorMessage}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;