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
      <div className={styles.contentWrapper}>
        <div className={styles.postContent}>
          <button type="button" name="closeBtn" id="closeBtn" onClick={onClick}>
            X
          </button>
          <h4 className={styles.postTitle}>{title}</h4>
          <p className={styles.postTitle}>{description}</p>
          <div className={styles.postInfo}>
            <img src="../img/user-solid.svg" alt="user icon" />
            <p className="post-author">{author}</p>
            <img src="../img/music-solid.svg" alt="music note" />
            <p className="post-instrument">
              {instrument} ({searchType})
            </p>
          </div>
        </div>
        <div className={styles.postIcon}>
          <img src="../img/instruments.svg" alt="instrument icon" />
        </div>
      </div>
      <div className={styles.metaWrapper}>
        <p className={styles.postMeta}>
          {date} &sdot; {location}
        </p>
      </div>
    </div>
  );
}
