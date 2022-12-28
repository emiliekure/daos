import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import styles from "./PostItem.module.css";

export default function PostItemModal({
  style,
  id,
  title,
  author,
  instrument,
  searchType,
  date,
  location,
  description,
  onClick,
}) {
  return (
    <div className={style} id={id}>
      <div className={styles.modalWrapper}>
        <div className={styles.postHeader}>
          <h3 className={styles.postTitle}>{title}</h3>
          <button
            type="button"
            name="closeBtn"
            id="closeBtn"
            className={styles.closeBtn}
            onClick={onClick}
          >
            <img src="../img/xmark-solid.svg" alt="close icon" />
          </button>
        </div>
        <div className={styles.postInfo}>
          <div className={styles.info}>
            <img src="../img/calendar-regular.svg" alt="user icon" />
            <p className="post-date">{date}</p>
          </div>
          <div className={styles.info}>
            <img src="../img/user-solid.svg" alt="user icon" />
            <p className="post-author">
              {author[0].name + " " + author[0].surname}
            </p>
          </div>
          <div className={styles.info}>
            <img src="../img/location.svg" alt="music note" />
            <p className="post-instrument">{location}</p>
          </div>
        </div>
        <div className={styles.postInstrument}>
          <h4>Instrument</h4>
          <p className="post-instrument">
            {instrument} ({searchType})
          </p>
        </div>
        <div className={styles.postDescription}>
          <h4>Description</h4>
          <p>{description}</p>
        </div>
        <div className={styles.buttons}>
          <PrimaryButton
            type="button"
            text="Contact"
            id="contact"
            onClick={() => (window.location = `mailto:${author[0].email}`)}
          />
          <SecondaryButton type="button" onClick={onClick} text="Close" />
        </div>
      </div>
    </div>
  );
}
