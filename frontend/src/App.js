import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Informations from "./pages/Informations";
import UserStatusProvider, { UserContext } from "./pages/UserStatusProvider";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

function App() {
  return (
    <UserStatusProvider>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={<Welcome />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/informations" element={<Informations />} />
          </Route>
          <Route path="/home">
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="chat/:chatname" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </UserStatusProvider>
  );
}

export default App;
