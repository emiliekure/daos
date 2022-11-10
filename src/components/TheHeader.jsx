import PrimaryButton from "./elements/PrimaryButton";
import SecondaryButton from "./elements/SecondaryButton";
import styles from "./TheHeader.module.css";

export default function TheHeader() {
	return (
		<header>
			<div className="company">
				<p className={styles.org}>Musik Samspil</p>
				<p className={styles.sub}>Created by DAOS</p>
			</div>
			<nav>
				<ul>
					<li>Home</li>
					<li>Posts</li>
				</ul>
				<div className={styles.buttons}>
					<PrimaryButton text="Sign up" />
					<SecondaryButton text="Login" />
				</div>
			</nav>
		</header>
	);
}
