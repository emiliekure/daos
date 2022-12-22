import { Link } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import styles from "./PostItem.module.css";
import btnstyles from "../../shared/TheHeader.module.css";

export default function UnauthorisedModal({
	style,
	onClick,
	errorMsg,
	isLoggedIn,
	title,
}) {
	return (
		<div className={style} id="unauthorisedModal">
			<div className={styles.modalWrapper}>
				<div className={styles.postHeader}>
					<h3 className={styles.postTitle}>
						{isLoggedIn ? title : "You are not logged in!"}
					</h3>
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
				<p>{errorMsg}</p>
				{!isLoggedIn && (
					<div className={btnstyles.buttons}>
						<Link to={"/signup"}>
							<PrimaryButton type="button" text="Sign up" />
						</Link>
						<Link to={"/login"}>
							<SecondaryButton type="button" text="Login" />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
