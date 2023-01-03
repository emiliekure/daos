import styles from "./ProfileCard.module.css";

export default function ProfileCard({
  style,
  id,
  title,
  name,
  surname,
  instrument,
  email,
  date,
}) {
  return (
    <>
      <div className={style} style={{ marginTop: 45 }} id={id + "div"}>
        <div className={styles.contentWrapper}>
          <div className={styles.postContent}>
            <h4 className={styles.postTitle}>{title}</h4>
            <div className={styles.postInfo}>
              <div className={styles.info}>
                <img src="../img/user-solid.svg" alt="user icon" />
                <p className="post-author">{name}</p>
              </div>
              <div className={styles.info}>
                <img src="../img/user-solid.svg" alt="user icon" />
                <p className="post-author">{surname}</p>
              </div>
              <div className={styles.info}>
                <img src="../img/music-solid.svg" alt="music note" />
                <p className="post-instrument">{instrument}</p>
              </div>
              <div className={styles.info}>
                <img src="../img/user-solid.svg" alt="user icon" />
                <p className="post-author">{email}</p>
              </div>
            </div>
          </div>
          <div className={styles.postIcon}>
            <img src="../img/instruments.svg" alt="instrument icon" />
          </div>
        </div>
        <div className={styles.metaWrapper}>
          <p className={styles.postMeta}>Last updated: {date}</p>
        </div>
      </div>
    </>
  );
}
