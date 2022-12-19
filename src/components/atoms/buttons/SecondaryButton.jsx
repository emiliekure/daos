import styles from "./Buttons.module.css";

export default function SecondaryButton({ type, onClick, text }) {
  return (
    <button type={type} onClick={onClick} className={styles.secondary_button}>
      {text}
    </button>
  );
}
