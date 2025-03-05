import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../services/api';
import './RequestPasswordReset.css';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    setLoading(true);
    try {
      const response = await requestPasswordReset({ email });
      if (response.status === 200) {
        setSuccessMessage("Password reset email sent successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Failed to send password reset email");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred while sending the password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="request-password-reset-page">
      <div className="request-password-reset-container">
        <form onSubmit={handleSubmit}>
          <h2>Request Password Reset</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RequestPasswordReset;