import { useEffect } from "react";
import { useAuth } from "../../components/auth/AuthProvider";

export default function Logout() {
  const { logout } = useAuth();

    useEffect(() => {
        logout();
    })

  return null;
}
