import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  if (!loggedInUser || loggedInUser.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;