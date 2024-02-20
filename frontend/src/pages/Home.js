import React, { useContext, useEffect, useState } from "react";
import NavList from "../components/NavList";
import {
  MenuButton,
  PeopleButton,
  NotifyButton,
} from "../components/navElements/Buttons";
import ProfileIcon from "../components/ProfileIcon";
import { UserContext } from "./UserStatusProvider";
import defaultProfileIcon from "../assets/icons/user.png";
import HomeNav from "../components/HomeNav";
import ProfileNav from "../components/ProfileNav";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [foundPeople, setFoundPeople] = useState([]);
  const userStatus = useContext(UserContext);

  useEffect(() => {
    if (userStatus.socket) return;
    let userId;
    if (!userStatus.user) {
      // V případě reloadu ještě nebude dostupný user objekt při prvním renderu
      userId = JSON.parse(localStorage.getItem("user"))?._id;
    } else {
      userId = userStatus.user._id;
    }
    if (!userId) return;
    const s = io.connect("https://project-x-vzmk.onrender.com", {
      query: {
        userId,
      },
    });
    userStatus.setSocket(s);

    s.on("notif", () => {
      console.log("notification");
    });
  }, []);

  const [windowsOpened, setWindowsOpened] = useState({
    menu: false,
    people: false,
    notify: false,
    profile: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `/api/feature/search?searchValue=${searchValue}`,
        {
          headers: {
            Authorization: userStatus.user.token,
          },
        }
      );
      setFoundPeople(res.data);
    } catch (error) {
      console.log("Error: " + error);
      setFoundPeople("");
    }
  };

  const windowsHandleFunction = (window) => {
    setWindowsOpened((prevWindowsOpened) => ({
      ...prevWindowsOpened,
      [window]: !prevWindowsOpened[window],
    }));
  };

  const closeHandleFunction = (e) => {
    if (
      !e.target.closest(".profile-pic") &&
      !e.target.closest(".icon-button") &&
      !e.target.closest(".blue-side-box") &&
      !e.target.closest(".profile-blue-side-box") &&
      !e.target.closest(".search-list")
    ) {
      if (windowsOpened.profile) {
        setWindowsOpened((prevWindowsOpened) => ({
          ...prevWindowsOpened,
          profile: false,
        }));
      }

      if (foundPeople.length > 0) {
        setFoundPeople([]);
      }

      if (windowsOpened.people || windowsOpened.notify || windowsOpened.menu) {
        setWindowsOpened((prevWindowsOpened) => ({
          ...prevWindowsOpened,
          menu: false,
          people: false,
          notify: false,
        }));
      }
    } else if (e.target.classList[0] === "profile-pic") {
      setWindowsOpened((prevWindowsOpened) => ({
        ...prevWindowsOpened,
        profile: !prevWindowsOpened.profile,
      }));
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", closeHandleFunction);
    return () => {
      document.body.removeEventListener("click", closeHandleFunction);
    };
  }, [windowsOpened, foundPeople]);

  return (
    <>
      <div className="body-layout">
        <NavList
          list={[
            {
              path: "menu",
              name: (
                <MenuButton
                  handleFunction={() => windowsHandleFunction("menu")}
                  opened={windowsOpened.menu}
                />
              ),
              side: "left",
              button: true,
            },
            {
              path: "notify",
              name: (
                <NotifyButton
                  handleFunction={() => windowsHandleFunction("notify")}
                  opened={windowsOpened.notify}
                />
              ),
              side: "left",
              button: true,
            },
            {
              path: "people",
              name: (
                <PeopleButton
                  handleFunction={() => windowsHandleFunction("people")}
                  opened={windowsOpened.people}
                />
              ),
              side: "left",
              button: true,
            },
            {
              path: "profile",
              name: (
                <ProfileIcon
                  profilePic={
                    userStatus.user.pic?.src
                      ? userStatus.user.pic?.src
                      : defaultProfileIcon
                  }
                />
              ),
              side: "right",
              button: true,
            },
          ]}
        />
        <HomeNav
          menuOpened={windowsOpened.menu}
          notifyOpened={windowsOpened.notify}
          peopleOpened={windowsOpened.people}
          activity={{
            users: [{ name: "test" }, { name: "test" }, { name: "test" }],
            groups: [{ name: "test" }, { name: "test" }],
          }}
          people={{
            users: [{ name: "test" }, { name: "test" }, { name: "test" }],
            groups: [{ name: "test" }, { name: "test" }],
          }}
        />
        <ProfileNav profileOpened={windowsOpened.profile} />
        <form onSubmit={(e) => submitHandler(e)} className="search-box">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search for people..."
            className="search-bar"
          />
          <button type="submit" className="search-icon non-visual-button">
            <SearchIcon />
          </button>
          {foundPeople.length > 0 && (
            <ul className="search-list">
              {foundPeople.map((elem) => (
                <li key={elem.email}>
                  <button className="non-visual-button">
                    <Link
                      to={`/home/profile/${elem.username}`}
                      className="non-visual-button"
                      state={{ user: elem }}
                    >
                      {elem.username}
                    </Link>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </>
  );
}
