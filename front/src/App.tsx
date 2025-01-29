import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Main from './pages/mainpage.tsx';
import Homework from './pages/homework.tsx';
import Notes from './pages/notes.tsx';
import Auth from './pages/auth.tsx';
import Profile from './pages/profile.tsx';

const AppLayout: React.FC = () => {
    const location = useLocation(); // Отримуємо поточний шлях

    // Масив сторінок, де не потрібно показувати sidebar
    const hiddenSidebarRoutes = ['/auth'];

    return (
        <div className='container'>
            {/* Відображаємо sidebar тільки якщо сторінка не в hiddenSidebarRoutes */}
            {!hiddenSidebarRoutes.includes(location.pathname) && (
                <nav className='sidebar'>
                    <ul>
                        <li><Link to="/">Головна</Link></li>
                        <li><Link to="/homework">Домашнє завдання</Link></li>
                        <li><Link to="/notes">Нотатки</Link></li>
                        <li><Link to="/auth">Авторизація</Link></li>
                        <li><Link to="/profile">Профіль</Link></li>
                    </ul>
                </nav>
            )}
            <div className='content'>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/homework" element={<Homework />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}

const App: React.FC = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;