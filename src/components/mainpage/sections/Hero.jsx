import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";
import InstrumentFilterSelect from "../../atoms/forms/InstrumentFilterSelect";

export default function Hero({ instrumentSelect, setInstrumentSelect }) {
  return (
    <section className={styles.hero}>
      <div className={styles.title}>
        <h1>Where amateur musicians connect to play classical music</h1>
        <div className={styles.buttons}>
          <InstrumentFilterSelect
            name="instrument"
            value={instrumentSelect}
            onChange={(evt) => setInstrumentSelect(evt.target.value)}
          />
          <Link to={"/posts"}>
            <PrimaryButton
              id="see-posts"
              text="See posts"
              onClick={() => console.log(instrumentSelect)}
            />
          </Link>
        </div>
      </div>
      <div className={styles.heroimage}>
        <img src="../img/hero.svg" alt="musical notes" />
      </div>
    </section>
  );
}
