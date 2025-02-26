import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateUser from "../components/CreateUser";


const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const loginUserMutation = trpc.loginUser.useMutation();

  const handleLogin = async () => {
    try {
      const { token, user } = await loginUserMutation.mutateAsync(loginData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1>Вхід</h1>

        <label>Логін</label>
        <input
          type="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />

        <label>Пароль</label>
        <input
          type="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />

        <button className="auth-button" onClick={handleLogin}>
          Увійти
        </button>
        <button
          className="auth-button"
          onClick={() => navigate("/registration")}
        >
          Реєстрація
        </button>
        <a href="/forgotpassword">Забули пароль?</a>
      </div>
      <Routes>
        <Route path="/registration" element={<CreateUser />} />
      </Routes>
    </div>
  );
};

export default Auth;
