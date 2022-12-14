import styles from "./FormFields.module.css";

export default function TextField({
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  errorName,
  errorSurname,
  errorTitle,
}) {
  return (
    <div
      className={name === "city" ? styles.cityfieldgroup : styles.fieldgroup}
    >
      {name === "city" && (
        <label for={name}>
          <h2></h2>
        </label>
      )}
      {name !== "city" && (
        <label for={name}>
          <h2>{name.replace("-", " ")}</h2>
        </label>
      )}
      <input
        name={name}
        id={name}
        type="text"
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {errorName && <p>{errorName}</p>}
      {errorSurname && <p>{errorSurname}</p>}
      {errorTitle && <p>{errorTitle}</p>}
    </div>
  );
}
