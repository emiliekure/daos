import styles from "./FilterButtons.module.css";

export default function FilterButton({ type, onClick, text, value, clicked }) {
  return (
    <button
      type={type}
      onClick={onClick}
      value={value}
      className={styles.filterBtn}
    >
      {text}
    </button>
  );
}
