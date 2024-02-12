import React, { useContext, useState } from "react";
import NavList from "../components/NavList";
import HomeLink from "../components/navElements/HomeLink";
import { UserContext } from "./UserStatusProvider";
import TextInput from "../components/TextInput";
import styles from "../pages_styles/settings.module.css";
import axios from "axios";

const Settings = () => {
  const userStatus = useContext(UserContext);
  const [checkedInputs, setCheckedInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    if (loading) return;
    setLoading(true);
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    try {
      console.log("upload to api");
      const { data } = await axios.post(
        "http://localhost:5000/api/feature/uploadImage",
        { image: base64 },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify({ ...user, pic: data }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="body-layout">
      <NavList
        list={[
          {
            path: userStatus.user === "" ? "/" : "/home",
            name: <HomeLink />,
            side: "left",
          },
        ]}
      ></NavList>
      <div className="app-info-center">
        <h2>Settings</h2>
        <main className="blue-box">
          <h5>Change password</h5>
          <form className={styles["settings-form"]}>
            <label htmlFor="old-password">
              Old password
              <TextInput
                /* error={checkedInputs && email === ""} */
                type="password"
                id={"old-password"}
                /* setterFunction={setEmail} */
                state="smaller not-avaible"
              />
            </label>
            <label htmlFor="new-password">
              New password
              <TextInput
                /* error={checkedInputs && email === ""} */
                type="password"
                id={"new-password"}
                /* setterFunction={setEmail} */
                state="smaller not-avaible"
              />
            </label>
            <button className={styles.button}>Change</button>
          </form>
          <h5>Change name</h5>
          <form className={styles["settings-form"]}>
            <label htmlFor="new-username">
              New username
              <TextInput
                /* error={checkedInputs && email === ""} */
                type="password"
                id={"new-username"}
                /* setterFunction={setEmail} */
                state="smaller not-avaible"
              />
            </label>
            <button className={styles.button}>Change</button>
          </form>
          <label className="left">
            Profile picture
            <button
              onClick={() => document.getElementById("imageUpload").click()}
              className={styles.button}
            >
              Upload
            </button>
          </label>
          <input
            id="imageUpload"
            type="file"
            onChange={uploadImage}
            className={styles["image-input"]}
          />
        </main>
      </div>
    </div>
  );
};

export default Settings;
