import styles from "./FormFields.module.css"

export default function TextField({name, max, placeholder, value, onChange}) {
	return (
		<div className={styles.fieldgroup}>
			<label htmlFor={name}><h2>{name.replace("-", " ")}</h2></label>
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
