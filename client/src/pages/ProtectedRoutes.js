import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAppContext();
  return user ? children : <Navigate to="/landing" />;
};

export default ProtectedRoutes;
