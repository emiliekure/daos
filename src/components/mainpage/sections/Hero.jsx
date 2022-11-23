import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.title}>
				<h1>Where amateur musicians connect to play classical music</h1>
				<div className="buttons">
					<select name="quick-search" id="quick-search">
						<option value="Instrument1">Instrument1</option>
						<option value="Instrument2">Instrument2</option>
						<option value="Instrument3">Instrument3</option>
					</select>
					<PrimaryButton text="See posts" />
				</div>
			</div>
			<div className={styles.heroimage}>
				<img src="../img/hero.svg" alt="musical notes" />
			</div>
		</section>
	);
}
