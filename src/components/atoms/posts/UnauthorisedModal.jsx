import { Link } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import styles from "./PostItem.module.css";
import btnstyles from "../../shared/TheHeader.module.css";

export default function UnauthorisedModal({ style, onClick }) {
  return (
    <div className={style} id="unauthorisedModal">
      <div className={styles.contentWrapper}>
        <div className={styles.postContent}>
          <button type="button" name="closeBtn" id="closeBtn" onClick={onClick}>
            X
          </button>
          <h4 className={styles.postTitle}>You aren't logged in!</h4>
          <p>
            To be able to see full description of the post, please login to your
            DAOS account or create a profile on our signup page.
          </p>
          <div className={btnstyles.buttons}>
            <Link to={"/signup"}>
              <PrimaryButton type="button" text="Sign up" />
            </Link>
            <Link to={"/login"}>
              <SecondaryButton type="button" text="Login" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
