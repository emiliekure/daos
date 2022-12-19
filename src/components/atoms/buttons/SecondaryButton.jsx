import styles from "./Buttons.module.css";

export default function SecondaryButton({ type, onClick, text, value }) {
  return (
    <button
      type={type}
      onClick={onClick}
      value={value}
      className={styles.secondary_button}
    >
      {text}
    </button>
  );
}
