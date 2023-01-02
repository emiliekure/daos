import { Link } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import styles from "./PostItem.module.css";
import btnstyles from "../../shared/TheHeader.module.css";

export default function UnauthorisedModal({
  style,
  onClick,
  errorMsg,
  isLoggedIn,
  title,
}) {
  return (
    <div className={style} id="unauthorisedModal">
      <div className={styles.contentWrapper}>
        <div className={styles.postContent}>
          <button type="button" name="closeBtn" id="closeBtn" onClick={onClick}>
            X
          </button>
          <h4 className={styles.postTitle}>
            {isLoggedIn ? title : "You are not logged in!"}
          </h4>
          <p>{errorMsg}</p>
          {!isLoggedIn && (
            <div className={btnstyles.buttons}>
              {window.location.href === "http://127.0.0.1:5173/signup" ? (
                <Link to={"/login"}>
                  <PrimaryButton id="login" type="button" text="Login" />
                </Link>
              ) : (
                <>
                  <Link to={"/signup"}>
                    <PrimaryButton id="signup" type="button" text="Sign up" />
                  </Link>
                  <Link to={"/login"}>
                    <SecondaryButton type="button" text="Login" />
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
