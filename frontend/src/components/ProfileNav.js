import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../pages/UserStatusProvider";

export default function ProfileNav({ profileOpened }) {
  const userStatus = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    userStatus.setUser("");
  };

  return (
    profileOpened && (
      <nav className="profile-blue-side-box" style={{ textAlign: "center" }}>
        <li>
          <Link to="/home/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button className="non-visual-button" onClick={logout}>
            Log Out
          </button>
        </li>
      </nav>
    )
  );
}
