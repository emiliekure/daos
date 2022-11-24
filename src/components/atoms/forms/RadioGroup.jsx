import styles from "./FormFields.module.css";

export default function RadioGroup({options, group, onClick }) {
	return (
		<div className={styles.fieldgroup}>
			<h2>{group.replace("-", " ")}</h2>
			{options.map((option) => {
				return (
					<label for={option} className={styles.radiolabel}>
						{option.charAt(0).toUpperCase() + option.slice(1)}
						<input
							name={group}
							id={option}
							type="radio"
							value={option}
							onClick={onClick}
						/>
					</label>
				);
			})}
		</div>
	);
}
