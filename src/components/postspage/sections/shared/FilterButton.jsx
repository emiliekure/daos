import styles from "../../../atoms/buttons/Buttons.module.css";

export default function FilterButton({ type, onClick, text, value, clicked }) {
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
