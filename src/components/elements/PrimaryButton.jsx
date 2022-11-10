import styles from "./Buttons.module.css";

export default function PrimaryButton({text}) {
	return(
		<button className={styles.primary_button}>
			{text}
		</button>
	)
}