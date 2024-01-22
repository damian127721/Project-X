import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../pages_styles/chat.module.css";
import NavList from "../components/NavList";
import {
  MenuButton,
  NotifyButton,
  PeopleButton,
} from "../components/navElements/Buttons";
import HomeNav from "../components/HomeNav";
import { useLocation } from "react-router-dom";
import defaultProfileIcon from "../assets/icons/user.png";
import { UserContext } from "./UserStatusProvider";

const Chat = () => {
  const selectedUser = useLocation().state.selectedUser;
  const userState = useContext(UserContext);
  const [messageSenderValue, setMessageSenderValue] = useState("");
  const allMessages = useRef();

  const [windowsOpened, setWindowsOpened] = useState({
    menu: false,
    people: false,
    notify: false,
    profile: false,
  });

  const windowsHandleFunction = (window) => {
    setWindowsOpened((prevWindowsOpened) => ({
      ...prevWindowsOpened,
      [window]: !prevWindowsOpened[window],
    }));
  };

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      console.log(messageSenderValue);
      setMessageSenderValue("");
    }
  };

  const closeHandleFunction = (e) => {
    if (!e.target.closest(".icon-button")) {
      if (windowsOpened.people || windowsOpened.notify || windowsOpened.menu) {
        setWindowsOpened((prevWindowsOpened) => ({
          ...prevWindowsOpened,
          menu: false,
          people: false,
          notify: false,
        }));
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", closeHandleFunction);
    return () => {
      document.body.removeEventListener("click", closeHandleFunction);
    };
  }, [windowsOpened]);

  useEffect(() => {
    allMessages.current.scrollTop = allMessages.current.scrollHeight;
  }, []);

  const [messages, setMessages] = useState([
    {
      sender: "Damian127",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "Damian127",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "d",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "d",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "Damian127",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "Damian127",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "Damian127",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "Damian127",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "Damian127",
      text: "Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "Damian127",
      text: "Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "d",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "d",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam quis quam. Fusce suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus luctus egestas leo. Proin in tellus sit amet nibh dignissim sagittis.",
    },
    {
      sender: "d",
      text: "Proin in tellus sit amet nibh dignissim sagittis.",
    },
  ]);

  return (
    <div className={"body-layout" + " " + styles["body-layout"]}>
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
      <div className={styles["all-messages-wrap"]}>
        <div className={styles["all-messages"]} ref={allMessages}>
          {messages.map((elem, i, arr) => {
            const isNextSameUser = elem.sender == arr[i + 1]?.sender;

            return (
              <div
                className={
                  styles["message-box"] +
                  " " +
                  (elem.sender === userState.user.username
                    ? styles["user-message"]
                    : "") +
                  " " +
                  (isNextSameUser ? styles["next-same-user"] : "")
                }
              >
                {elem.sender !== userState.user.username && !isNextSameUser ? (
                  <img
                    src={
                      selectedUser.pic ? selectedUser.pic : defaultProfileIcon
                    }
                    className={styles["message-icon"]}
                  />
                ) : (
                  <div style={{ flexBasis: "48px", flexShrink: "0" }}></div>
                )}
                <p>{elem.text}</p>
              </div>
            );
          })}
          <input
            value={messageSenderValue}
            onChange={(e) => setMessageSenderValue(e.target.value)}
            className={styles["message-sender"]}
            onKeyDown={sendMessage}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Chat;
