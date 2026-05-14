import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // If no token, kick them back to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;