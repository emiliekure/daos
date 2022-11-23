import styles from "./FormFields.module.css"

export default function PasswordField({type, value, onChange}) {
	return (
		<div className={styles.fieldgroup}>
			<label for={type}>{type.replace("-", " ")}</label>
			<input
				name={type}
				id={type}
				type="password"
				required
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
