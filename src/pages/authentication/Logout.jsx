import { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../components/auth/AuthProvider";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  });

  return <Navigate to="/" />;
}
