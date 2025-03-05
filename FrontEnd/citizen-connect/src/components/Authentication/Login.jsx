import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setEmailError(null);
    } else if (name === "password") {
      setPassword(value);
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await login(email, password);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      if (user.role === "admin") {
        navigate("/admindashboard");
      } else if (user.role === "official") {
        navigate("/officialdashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="account">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
          <p className="reset-password">
            <Link to="/request-password-reset" className="reset-link">
              Forgot password?
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;