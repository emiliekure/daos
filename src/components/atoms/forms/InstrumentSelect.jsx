import styles from "./FormFields.module.css";

export default function InstrumentSelect({ name, value, onChange }) {
	const instruments = [
		"Violin",
		"Viola",
		"Cello",
		"Double bass",
		"Transverse flute",
		"Piccolo",
		"Clarinet",
		"Saxophone",
		"Oboe",
		"English horn",
		"Bassoon",
		"French horn",
		"Trumpet",
		"Trombone",
		"Tuba",
		"Harp",
		"Piano",
		"Celesta",
		"Cembalo",
		"Organ",
		"Conductor",
		// "All instruments",
	];

	return (
		<div className={styles.fieldgroup}>
			<label htmlFor={name}>
				<h2>{name.replace("-", " ")}</h2>
			</label>
			<select
				name={name}
				id={name}
				required
				defaultValue={value}
				onChange={onChange}
			>
				<option disabled value={""}>
					Please choose your instrument
				</option>
				{instruments.sort().map((instrument, index) => {
					return (
						<option value={instrument} key={"instrument-" + index}>
							{instrument}
						</option>
					);
				})}
				<option value="Other instrument">Other instrument</option>
				<option value="Other percussion">Other percussion</option>
			</select>
		</div>
	);
}
