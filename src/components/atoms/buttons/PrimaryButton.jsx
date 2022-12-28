import styles from "./Buttons.module.css";

export default function PrimaryButton({ type, onClick, text, id }) {
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={styles.primary_button}
    >
      {text}
    </button>
  );
}
