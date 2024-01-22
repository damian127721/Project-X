import React, { useContext, useEffect, useState } from "react";
import NavList from "../components/NavList";
import HomeLink from "../components/navElements/HomeLink";
import { UserContext } from "./UserStatusProvider";
import userDefaultIcon from "../assets/icons/user.png";
import { ReactComponent as LetterIcon } from "../assets/icons/letter.svg";
import styles from "../pages_styles/profile.module.css";
import { ReactComponent as AddIcon } from "../assets/icons/add-person.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { user } = useContext(UserContext);
  const searchedUser = useLocation().state?.user;
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchedUser) {
      setSelectedUser(searchedUser);
    } else {
      setSelectedUser(user);
    }
  }, [user, searchedUser]);

  return (
    <div className="body-layout">
      <NavList
        list={[
          {
            path: "/home",
            name: <HomeLink />,
            side: "left",
          },
        ]}
      ></NavList>
      <div className={styles.profile_column}>
        <img
          className={styles.profile_picture}
          src={selectedUser?.pic ? selectedUser?.pic : userDefaultIcon}
        />
        <div className={styles.user_interact}>
          <h3>{selectedUser?.username}</h3>
          {searchedUser && (
            <div className={styles.icon_box}>
              <button className="icon-button">
                <AddIcon className="icon blue_theme" />
              </button>
              <button
                className="icon-button"
                onClick={() =>
                  navigate(`../chat/${selectedUser.username}`, {
                    state: { selectedUser: selectedUser },
                  })
                }
              >
                <LetterIcon className="icon blue_theme" />
              </button>
            </div>
          )}
        </div>
        <textarea className={searchedUser ? "not-allowed" : ""} />
      </div>
    </div>
  );
}
