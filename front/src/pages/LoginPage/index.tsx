import axios from "axios";
import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const nav = useNavigate();
  const [logindata, setLoginData] = useState({ email: "", password: "" });

  const login = async () => {
    if (
      await axios.post("http://localhost:3000/user/login", logindata, {
        withCredentials: true,
      })
    ) {
      nav("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <h1>Вхід</h1>
          <label>Логін</label>
          <input
            type="email"
            value={logindata.email}
            onChange={(e) =>
              setLoginData({ ...logindata, email: e.target.value })
            }
          />
          <label>Пароль</label>
          <input
            type="password"
            value={logindata.password}
            onChange={(e) =>
              setLoginData({ ...logindata, password: e.target.value })
            }
          />
          <button className="auth-button" onClick={login}>
            Увійти
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
