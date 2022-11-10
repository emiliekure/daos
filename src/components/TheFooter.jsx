import styles from "./TheFooter.module.css";

export default function TheFooter() {
	return (
		<footer>
			<div className={styles.footer}>
				<div className={styles.links}>
					<p className={styles.org}>Musik Samspil</p>
					<ul>
						<li>Home</li>
						<li>Posts</li>
					</ul>
					<div className={styles.socials}>

					</div>
				</div>
				<img className="notes" src="../img/footer.svg" alt="musical notes" />
				<div className={styles.logo}>
					<p className={styles.sub}>Created by DAOS</p>
					<img src="../img/daos-logo.png" alt="" />
				</div>
			</div>
			<nav>
				<ul>
					<li>Contact</li>
					<li>Find orchestras</li>
					{/* <li>Find music sheets</li>
					<li>DOAS courses</li>
					<li>DAOS summer convention</li> */}
					<li>Privacy policy</li>
				</ul>
			</nav>
		</footer>
	);
}
