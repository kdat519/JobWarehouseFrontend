import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/navbar/AdminNavBar";
import "./styles.scss"

export default function Admin() {
  return (
    <div>
      <AdminNavBar />
      <Outlet />
    </div>
  );
}
