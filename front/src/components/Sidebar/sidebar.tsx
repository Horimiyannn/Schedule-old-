import { Link } from "react-router-dom";
import "./index.css";

export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <Link to="/" className="link">Головна</Link>
      <Link to="/auth" className="link">Авторизація</Link>
    </nav>
  );
};
