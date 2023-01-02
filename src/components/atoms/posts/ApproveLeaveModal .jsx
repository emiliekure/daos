import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import styles from "./PostItem.module.css";
import btnstyles from "../../shared/TheHeader.module.css";

export default function ApproveLeaveModal({
  style,
  setApproveLeave,
  handleRemoveMember,
  id,
}) {
  return (
    <div className={style} id="approveLeaveModal">
      <div className={styles.contentWrapper}>
        <div className={styles.postContent}>
          <button
            type="button"
            name="closeBtn"
            id="closeBtn"
            onClick={setApproveLeave}
          >
            X
          </button>
          <h4 className={styles.postTitle}>
            Are you sure you want to leave this ensemble?
          </h4>
          <p>
            By clicking leave, you will no longer be a part of this ensemble.
            However, you can easily rejoin the group later, if there are free
            member places available.
          </p>
          <div className={btnstyles.buttons}>
            <SecondaryButton
              type="button"
              text="Cancel"
              onClick={setApproveLeave}
            />
            <PrimaryButton
              id={id}
              type="button"
              text="Leave"
              onClick={(event) => handleRemoveMember(event.target.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
