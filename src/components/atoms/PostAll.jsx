import styles from "./PostAll.module.css";
import { Link } from "react-router-dom";

export default function PostAll({cardStyle, idStyle}) {
	return (
		<div className={cardStyle} id={idStyle}>
			<Link to={"/posts"}>
				<h3>See all posts</h3>
				<div className={styles.iconAll}>
					<img src="../img/instruments.svg" alt="instrument icon" />
				</div>
			</Link>
		</div>
	);
}
