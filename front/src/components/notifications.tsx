import React, { useState } from 'react';

const Notifications: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNotifications = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="notifications-container">
            <button className="notifications-button" onClick={toggleNotifications}>
                🔔 Повідомлення
            </button>
            {isOpen && (
                <div className="notifications-dropdown">
                    <ul>
                        <li>Купи баротравму</li>
                        <li>Купи сквад</li>
                        <li>Купи стеларіс</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notifications;
