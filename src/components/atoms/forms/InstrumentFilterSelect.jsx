import styles from "./FormFields.module.css";

export default function InstrumentFilterSelect({ name, value, onChange }) {
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
		"All instruments",
	];

	return (
		<div className={styles.fieldgroup}>
			<label htmlFor={name}>
				<h3>{name.replace("-", " ")}</h3>
			</label>
			<select
				name={name}
				id={name}
				required
				value={value}
				onChange={onChange}
			>
				<option disabled selected value="">
					Please choose your instrument
				</option>
				{instruments.sort().map((instrument) => {
					return <option value={instrument}>{instrument}</option>;
				})}
				<option value="Other instrument">Other instrument</option>
				<option value="Other percussion">Other percussion</option>
			</select>
		</div>
	);
}