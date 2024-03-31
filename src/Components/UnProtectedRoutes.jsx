
import { Navigate } from 'react-router-dom';


export default function UnProtectedRoutes({ children }) {
  const token = localStorage.getItem('userToken');
  return token ? <Navigate to="/" replace /> : children;
}
