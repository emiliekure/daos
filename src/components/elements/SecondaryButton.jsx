import styles from "./Buttons.module.css";

export default function SecondaryButton({text}) {
	return(
		<button className={styles.secondary_button}>
			{text}
		</button>
	)
}