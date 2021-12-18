import { useEffect } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import { Navigate } from "react-router";


export default function Logout() {
  const { logout } = useAuth();

    useEffect(() => {logout()})

  return <Navigate to="/" />;
}
