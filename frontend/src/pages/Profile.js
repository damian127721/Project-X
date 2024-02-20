import React, { useContext, useEffect, useRef, useState } from "react";
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
  const { user, setUser } = useContext(UserContext);
  const searchedUser = useLocation().state?.user;
  const [selectedUser, setSelectedUser] = useState(null);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (searchedUser) {
      setSelectedUser(searchedUser);
    } else {
      setSelectedUser(user);
    }
  }, [user, searchedUser]);

  useEffect(() => {
    setBio(selectedUser?.bio);
  }, [selectedUser]);

  const timeoutId = useRef();

  const handleBioChange = (e) => {
    const bioUpdated = e.target.value;
    setBio(bioUpdated);
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/feature/updateBio",
          { bio: bioUpdated },
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, bio: bioUpdated })
        );
        setUser({ ...user, bio: bioUpdated });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  const onOpenChat = async () => {
    try {
      let { data: chat } = await axios.get(
        `http://localhost:5000/api/chat/privateChatExists?contactId=${searchedUser._id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (!chat) {
        const { data } = await axios.post(
          "http://localhost:5000/api/chat/createChat",
          {
            users: [selectedUser._id],
            isGroupChat: false,
          },
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        chat = data;
      }

      navigate(`../chat/${selectedUser.username}`, {
        state: { selectedUser: selectedUser, chat },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          src={
            selectedUser?.pic?.src ? selectedUser?.pic?.src : userDefaultIcon
          }
        />
        <div className={styles.user_interact}>
          <h3>{selectedUser?.username}</h3>
          {searchedUser && selectedUser?._id != user._id && (
            <div className={styles.icon_box}>
              <button className="icon-button">
                <AddIcon className="icon blue_theme" />
              </button>
              <button className="icon-button" onClick={onOpenChat}>
                <LetterIcon className="icon blue_theme" />
              </button>
            </div>
          )}
        </div>
        <textarea
          onChange={handleBioChange}
          value={bio}
          className={searchedUser ? "not-allowed" : ""}
        />
      </div>
    </div>
  );
}
