import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import styles from "./PostItem.module.css";
import btnstyles from "../../shared/TheHeader.module.css";

export default function ApproveDeleteModal({
  style,
  setApproveDelete,
  handleDelete,
  id,
  post,
}) {
  return (
    <div className={style} id="approveDeleteModal">
      <div className={styles.contentWrapper}>
        <div className={styles.postContent}>
          <button
            type="button"
            name="closeBtn"
            id="closeBtn"
            onClick={setApproveDelete}
          >
            X
          </button>
          <p>
            Are you sure you would like to delete this{" "}
            {post ? "post" : "ensemble"}?
          </p>
          <div className={btnstyles.buttons}>
            <SecondaryButton
              type="button"
              text="Cancel"
              onClick={setApproveDelete}
            />
            <PrimaryButton
              id={id}
              type="button"
              text="Delete"
              onClick={(event) => handleDelete(event.target.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
