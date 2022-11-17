import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import styles from "./TheHeader.module.css";
import { Link } from "react-router-dom";

export default function TheHeader() {
	return (
		<header>
			<div className="company">
				<Link to={"/"}>
					<p className={styles.org}>Musik Samspil</p>
					<p className={styles.sub}>Created by DAOS</p>
				</Link>
			</div>
			<nav>
				<ul>
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/posts"}>Posts</Link>
					</li>
				</ul>
				<div className={styles.buttons}>
					<PrimaryButton text="Sign up" />
					<SecondaryButton text="Login" />
				</div>
			</nav>
		</header>
	);
}
