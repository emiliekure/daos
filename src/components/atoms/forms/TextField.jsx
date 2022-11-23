import styles from "./FormFields.module.css"

export default function TextField({name, max, placeholder, value, onChange}) {
	return (
		<div className={styles.fieldgroup}>
			<label for={name}>{name.replace("-", " ")}</label>
			<input
				name={name}
				id={name}
				type="text"
				required
				maxLength={max}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
