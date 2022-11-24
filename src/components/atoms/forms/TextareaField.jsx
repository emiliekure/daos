import styles from "./FormFields.module.css"

export default function TextareaField({name, value, onChange}) {
	return (
		<div className={styles.fieldgroup}>
			<label htmlFor={name}><h2>{name.replace("-", " ")}</h2></label>
			<textarea
				name={name}
				id={name}
				required
				value={value}
				onChange={onChange}
			></textarea>
		</div>
	);
}
