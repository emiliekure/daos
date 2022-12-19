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
              <Link to={"/signup"}>
                <PrimaryButton type="button" text="Sign up" />
              </Link>
              <Link to={"/login"}>
                <SecondaryButton type="button" value={"login"} text="Login" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
