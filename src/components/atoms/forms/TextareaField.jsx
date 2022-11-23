import styles from "./FormFields.module.css"

export default function TextareaField({name, value, onChange}) {
	return (
		<div className={styles.fieldgroup}>
			<label for={name}>{name.replace("-", " ")}</label>
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
