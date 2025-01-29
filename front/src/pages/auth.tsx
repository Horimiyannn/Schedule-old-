import React from 'react';
import { useNavigate } from 'react-router-dom';
const Auth: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='auth-container'>
            <div className='auth-content'>
                <h1>Вхід</h1>

                <label>Логін</label>
                <input type="login"></input>

                <label>Пароль</label>
                <input type="password"></input>

                <button className='auth-button' onClick={() =>navigate('/')}>Увійти</button>
                <a href="/forgotpassword">Забули пароль?</a>
            </div>
                
        </div>

    )
};

export default Auth;
