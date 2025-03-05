import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { register } from "../../services/api";

const Signup = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "name") setNameError(null);
    if (name === "email") setEmailError(null);
    if (name === "location") setLocationError(null);
    if (name === "password") setPasswordError(null);
    if (name === "confirmPassword") setConfirmPasswordError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        location: formData.location,
        password: formData.password
      };
      const response = await register(userData);
      if (response.status === 201) {
        setSuccessMessage("User registered successfully!");
        setFormData({
          name: "",
          email: "",
          location: "",
          password: "",
          confirmPassword: ""
        });

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        throw new Error("Failed to register user");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred while registering the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="section">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h2>Register a New User</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {nameError && <div className="error-message">{nameError}</div>}
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div>
            <label>Location: </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            {locationError && <div className="error-message">{locationError}</div>}
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <div>
            <label>Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="account">
            Already Have an Account?{" "}
            <Link to="/" className="signup-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;