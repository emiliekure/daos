import styles from "./FormFields.module.css"

export default function EmailField({value, onChange}) {
	return (
		<div className={styles.fieldgroup}>
			<label for="email">E-mail</label>
			<input
				name="email"
				id="email"
				type="email"
				required
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
