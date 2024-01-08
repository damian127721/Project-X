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

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [foundPeople, setFoundPeople] = useState([]);
  const userStatus = useContext(UserContext);

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
        `http://localhost:5000/api/feature/search?searchValue=${searchValue}`,
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
    if (e.target.tagName == "BODY" && windowsOpened.profile) {
      setWindowsOpened((prevWindowsOpened) => ({
        ...prevWindowsOpened,
        profile: false,
      }));
    } else if (e.target.classList[0] === "profile-pic") {
      setWindowsOpened((prevWindowsOpened) => ({
        ...prevWindowsOpened,
        profile: !prevWindowsOpened.profile,
      }));
    }

    if (e.target.tagName == "BODY" && foundPeople.length > 0) {
      console.log("test");
      setFoundPeople([]);
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
                    userStatus.user.pic
                      ? userStatus.user.pic
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
            users: [{ name: "damian" }, { name: "kokot" }, { name: "piča" }],
            groups: [{ name: "hospoda" }, { name: "piča D" }],
          }}
          people={{
            users: [{ name: "damian" }, { name: "kokot" }, { name: "piča" }],
            groups: [{ name: "hospoda" }, { name: "piča D" }],
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
                  <button className="non-visual-button">{elem.username}</button>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </>
  );
}
