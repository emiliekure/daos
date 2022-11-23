import styles from "./PostItem.module.css";

export default function PostItem({style, id, title, author, instrument, searchType, date, location}) {
	return (
		<div className={style} id={id}>
			<div className={styles.contentWrapper}>
				<div className={styles.postContent}>
					<h4 className={styles.postTitle}>{title}</h4>
					<div className={styles.postInfo}>
						<img src="../img/user-solid.svg" alt="user icon" />
						<p className="post-author">{author}</p>
						<img src="../img/music-solid.svg" alt="music note" />
						<p className="post-instrument">{instrument} ({searchType})</p>
					</div>
				</div>
				<div className={styles.postIcon}>
					<img src="../img/instruments.svg" alt="instrument icon" />
				</div>
			</div>
			<div className={styles.metaWrapper}>
				<p className={styles.postMeta}>{date} &sdot; {location}</p>
			</div>
		</div>
	);
}
