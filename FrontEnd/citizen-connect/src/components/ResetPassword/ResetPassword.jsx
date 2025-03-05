import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(token, { newPassword });
      if (response.status === 200) {
        setSuccessMessage("Password reset successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Failed to reset password");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="reset-password-page">
      <div className="reset-password-container">
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;