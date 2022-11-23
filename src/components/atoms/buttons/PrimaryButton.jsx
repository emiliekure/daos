import styles from "./Buttons.module.css";

export default function PrimaryButton({type, onClick, text}) {
	return(
		<button type={type} onClick={onClick} className={styles.primary_button}>
			{text}
		</button>
	)
}