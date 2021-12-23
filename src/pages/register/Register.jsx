import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    if (
      username.current.value.trim() == null ||
      username.current.value.trim() === ""
    ) {
      username.current.setCustomValidity("Do not have space");
      console.log("error");
    } else if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/register", user).then((res) => {
          console.log(res);
        });
        history.push("/login");
      } catch (err) {
        console.log(err.message);
        email.current.setCustomValidity(err.message);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FFL</h3>
          <span className="loginDesc">DONATION</span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="registerInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              minLength="6"
              type="password"
              className="registerInput"
            />
            <input
              placeholder="Comfirm Password"
              required
              ref={passwordAgain}
              minLength="6"
              type="password"
              className="registerInput"
            />
            <button className="submitSignUp" type="submit">
              Sign up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Back to Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
