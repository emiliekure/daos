import styles from "./FormFields.module.css"

export default function RadioField({name, group, onClick}) {
	return (
		<div className={styles.fieldgroup}>
			<input
				name={group}
				id={name}
				type="radio"
				value={name}
				onClick={onClick}
			/>
			<label for={name}>{name}</label>
		</div>
	);
}
