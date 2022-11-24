import styles from "./FormFields.module.css"

export default function PasswordField({type, value, onChange}) {
	return (
		<div className={styles.fieldgroup}>
			<label htmlFor={type}><h2>{type.replace("-", " ")}</h2></label>
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
