import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import styles from "./PostItem.module.css";
import btnstyles from "../../shared/TheHeader.module.css";

export default function UnauthorisedModal({
  style,
  setApproveDelete,
  handleDelete,
  id,
  post,
}) {
  return (
    <div className={style} id="unauthorisedModal">
      <div className={styles.modalWrapper}>
        <div className={styles.postHeader}>
          <p style={{ marginTop: 10 }}>
            {" "}
            Are you sure you would like to delete this{" "}
            {post ? "post" : "ensemble"}?
          </p>
          <button
            type="button"
            name="closeBtn"
            id="closeBtn"
            className={styles.closeBtn}
            onClick={setApproveDelete}
          >
            <img src="../img/xmark-solid.svg" alt="close icon" />
          </button>
        </div>
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
  );
}
