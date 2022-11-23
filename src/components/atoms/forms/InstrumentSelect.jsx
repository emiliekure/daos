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
	];

	return (
		<div className={styles.fieldgroup}>
			<label for={name}>{name.replace("-", " ")}</label>
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
