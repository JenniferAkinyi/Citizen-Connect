import React from 'react';
import { Navigate } from 'react-router-dom';

const OfficialRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  if (!loggedInUser || loggedInUser.role !== 'official') {
    return <Navigate to="/" />;
  }

  return children;
};

export default OfficialRoute;