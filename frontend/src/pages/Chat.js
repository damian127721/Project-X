import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../pages_styles/chat.module.css";
import NavList from "../components/NavList";
import { useLocation } from "react-router-dom";
import defaultProfileIcon from "../assets/icons/user.png";
import { UserContext } from "./UserStatusProvider";
import axios from "axios";
import HomeLink from "../components/navElements/HomeLink";

const Chat = () => {
  const { selectedUser, chat } = useLocation().state;
  const userState = useContext(UserContext);
  const [messageSenderValue, setMessageSenderValue] = useState("");
  const allMessages = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    userState.socket.emit("join-room", chat._id);
    userState.socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("got message");
    });

    return () => {
      userState.socket.emit("leave-room", chat._id);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/message/getChatMessages?chatId=${chat._id}`,
          {
            headers: {
              Authorization: userState.user.token,
            },
          }
        );
        setMessages(data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    if (userState.user) fetchMessages();
  }, [userState]);

  const sendMessage = async (e) => {
    if (e.key !== "Enter") {
      return;
    }

    if (messageSenderValue === "") {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userState.user.token,
        },
        body: JSON.stringify({
          text: messageSenderValue,
          chatId: chat._id,
        }),
        method: "POST",
      };
      const res = await fetch(
        "http://localhost:5000/api/message/sendMessage",
        config
      );

      const message = await res.json();
      setMessages((prevMessages) => {
        return [...prevMessages, message];
      });
      userState.socket.emit("message", message, chat._id);
      userState.socket.emit("notif", selectedUser._id);
      setMessageSenderValue("");
    } catch (error) {}
  };

  useEffect(() => {
    allMessages.current.scrollTop = allMessages.current.scrollHeight;
  }, [messages]);

  return (
    <div className={"body-layout"}>
      <NavList
        list={[
          {
            path: "/home",
            name: <HomeLink />,
            side: "left",
          },
        ]}
      ></NavList>
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
                      selectedUser.pic.src
                        ? selectedUser.pic.src
                        : defaultProfileIcon
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
