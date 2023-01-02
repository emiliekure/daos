import styles from "./FormFields.module.css";

export default function EmailField({
  value,
  onChange,
  onBlur,
  availableMsg,
  errorEmail,
  emailExists,
}) {
  console.log(emailExists);
  return (
    <div className={styles.fieldgroup}>
      <label htmlFor="email">
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
      {errorEmail && <p>{errorEmail}</p>}
      {emailExists && emailExists === "Email available" && (
        <p>The email does not exist!</p>
      )}
    </div>
  );
}
