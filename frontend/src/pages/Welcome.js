import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavList from "../components/NavList";
import TextInput from "../components/TextInput";
import robotAnimation from "../assets/robot-animation.json";
import spaceshipStream from "../assets/spaceship-stream.svg";
import spaceshipCabine from "../assets/spaceship-cabine.svg";
import welcomeTabs from "../assets/welcome-tabs.json";
import CustomError from "../components/Error";
import { UserContext } from "./UserStatusProvider";

export default function Welcome() {
  const [underlineLeft, setUnderlineLeft] = useState("tvorba");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedInputs, setCheckedInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userStatus = useContext(UserContext);

  const navigate = useNavigate();

  const robotOptions = {
    animationData: robotAnimation,
    loop: true,
    style: {
      height: 250,
      width: 208,
      position: "absolute",
      bottom: -48,
    },
  };
  const { View: Robot } = useLottie(robotOptions);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!email || !password) {
      setCheckedInputs(true);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      userStatus.setUser(res.data);
      navigate("/home");
    } catch (err) {
      if (!error) {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
    setLoading(false);
  };

  return (
    <div className="background-img">
      {error && <CustomError message={error} />}
      <div className="body-layout">
        <header>
          <NavList
            list={[
              {
                path: "/informations",
                name: "Informations",
                side: "right",
              },
            ]}
          ></NavList>
          <div className="welcome-front">
            <div className="spaceship">
              <img
                className="spaceship-cabine"
                src={spaceshipCabine}
                alt="spaceship"
              />
              <img
                className="spaceship-stream"
                src={spaceshipStream}
                alt="spaceship"
              />
            </div>
            <div className="login">
              <h1>Appandos</h1>
              <div className="equal-flex">
                <TextInput
                  error={checkedInputs && email === ""}
                  type="email"
                  placeholder="Email"
                  setterFunction={setEmail}
                />
                <TextInput
                  error={checkedInputs && password === ""}
                  state={checkedInputs && password === "" ? "error" : ""}
                  type="password"
                  placeholder="Password"
                  setterFunction={setPassword}
                />
                <div className="right-middle-flex">
                  <p>
                    Don’t have account ?{" "}
                    <span>
                      <Link className="bold" to="/registration">
                        Register there
                      </Link>
                    </span>
                  </p>
                  <button
                    className="non-visual-button"
                    onClick={(e) => submitHandler(e)}
                  >
                    <h4>Login</h4>
                  </button>
                </div>
              </div>
            </div>
            <div className="representative-frame">{Robot}</div>
          </div>
        </header>
      </div>
      <main className="welcome-main">
        <h2>O projektu</h2>
        <ul className={`underline-left-${underlineLeft}`}>
          <li onClick={() => setUnderlineLeft("tvorba")}>Tvorba</li>
          <li onClick={() => setUnderlineLeft("zamer")}>Záměr</li>
          <li onClick={() => setUnderlineLeft("nastroje")}>Nástroje</li>
          <li onClick={() => setUnderlineLeft("namet")}>Námět</li>
        </ul>
        <p>{welcomeTabs[underlineLeft]}</p>
      </main>
    </div>
  );
}
