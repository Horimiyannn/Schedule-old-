import axios from "axios";
import { useState } from "react";


const AuthPage = () => {
  const [logindata, setLoginData] = useState({ email: "", password: "" });
  
  const login = async () => {
    await axios.post("http://localhost:3000/login", logindata, {
      withCredentials: true,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1>Вхід</h1>
        <div>
          <label>Вхід</label>
          <input
            type="email"
            value={logindata.email}
            onChange={(e) =>
              setLoginData({ ...logindata, email: e.target.value })
            }
          />
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
