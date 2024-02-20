import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const UserContext = createContext();

export default function UserStatusProvider({ children }) {
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, socket, setSocket }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
