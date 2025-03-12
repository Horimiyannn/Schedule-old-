import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";

export const Sidebar = () => {
  const logout = async () =>{
    await axios.post("http://localhost:3000/user/logout","", {
      withCredentials: true,
    })
  }

  return (
    <nav className="sidebar">
      <Link to="/" className="link">Головна</Link>
      <Link to="/auth" className="link" onClick={logout}>Вийти</Link>
      <Link to="/homework" className="link">Домашнє завдання</Link>
    </nav>
  );
};
