import PrimaryButton from "../atoms/buttons/PrimaryButton";
import SecondaryButton from "../atoms/buttons/SecondaryButton";
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
					<li>
						<Link to={"/createpost"}>Create post</Link>
					</li>
				</ul>
				<div className={styles.buttons}>
					<Link to={"/signup"}>
						<PrimaryButton type="button" text="Sign up" />
					</Link>
					<Link to={"/login"}>
						<SecondaryButton type="button" text="Login" />
					</Link>
				</div>
			</nav>
		</header>
	);
}
