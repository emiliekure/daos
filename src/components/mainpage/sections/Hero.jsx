import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.title}>
				<h1>Where amateur musicians connect to play classical music</h1>
				<div className="buttons">
					<InstrumentSelect
						name="instrument"
						value=""
						onChange=""
					/>
					<PrimaryButton text="See posts" />
				</div>
			</div>
			<div className={styles.heroimage}>
				<img src="../img/hero.svg" alt="musical notes" />
			</div>
		</section>
	);
}
