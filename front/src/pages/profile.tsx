import React from "react";

const Profile: React.FC =() => {
    return (
        <div>
            <h1>Профіль</h1>
            <div className="profile-container">
                <div className="user-name">
                    <img src="../src/components/images/avatar.jpg" className="avatar"/>
                    <h2>Username</h2>
                </div>
                <div className="user-info">
                    <p><b>Email:</b> example@mail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Profile