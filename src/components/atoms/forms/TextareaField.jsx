import styles from "./FormFields.module.css";

export default function TextareaField({
  name,
  value,
  onChange,
  onBlur,
  errorDescription,
  ensambleDescriptionError,
}) {
  return (
    <div className={styles.fieldgroup}>
      <label for={name}>
        <h2>{name.replace("-", " ")}</h2>
      </label>
      <textarea
        name={name}
        id={name}
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>

      {errorDescription && <p>{errorDescription}</p>}
      {ensambleDescriptionError && <p>{ensambleDescriptionError}</p>}
    </div>
  );
}
