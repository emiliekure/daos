import PrimaryButton from "../atoms/buttons/PrimaryButton";
import SecondaryButton from "../atoms/buttons/SecondaryButton";
import styles from "./TheHeader.module.css";
import style from "./PostList.module.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useState } from "react";
import UnauthorisedModal from "../atoms/posts/UnauthorisedModal";

export default function TheHeader({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <header>
      <div className="company">
        <Link to={"/"}>
          <p className={styles.org}>Musik Samspil</p>
          <p className={styles.sub}>Created by DAOS</p>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/posts"}>Posts</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to={"/createpost"}>Create post</Link>
              </li>
              <li>
                <Link to={"/createensamble"}>Create ensamble</Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.buttons}>
          <Link to={"/signup"}>
            <PrimaryButton id="signup" type="button" text="Sign up" />
          </Link>
          {isLoggedIn ? (
            <Link
              to={
                window.location.href === "http://127.0.0.1:5173/settings"
                  ? "/login"
                  : "#"
              }
            >
              <SecondaryButton
                type="button"
                text="Log out"
                onClick={() => {
                  setIsLoggedIn(false),
                    setErrorMsg(
                      "You are now successfully logged out of your DAOS account!"
                    ),
                    setIsOpen(true);
                  localStorage.clear();
                }}
              />
            </Link>
          ) : (
            <Link to={"/login"}>
              <SecondaryButton type="button" text="Login" />
            </Link>
          )}
        </div>
      </nav>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick
      >
        <UnauthorisedModal
          style={style.card}
          onClick={() => setIsOpen(false)}
          errorMsg={errorMsg}
          isLoggedIn={isLoggedIn}
        ></UnauthorisedModal>
      </Modal>
    </header>
  );
}
