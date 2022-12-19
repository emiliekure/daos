import styles from "./FormFields.module.css";

export default function EmailField({ value, onChange, onBlur, availableMsg }) {
  return (
    <div className={styles.fieldgroup}>
      <label for="email">
        <h2>E-mail</h2>
      </label>
      <input
        name="email"
        id="email"
        type="email"
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {availableMsg && availableMsg === "Email unavailable" && (
        <p>The email is already in use!</p>
      )}
    </div>
  );
}
