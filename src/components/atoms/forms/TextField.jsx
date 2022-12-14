import styles from "./FormFields.module.css";

export default function TextField({
  name,
  id,
  max,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className={styles.fieldgroup}>
      <label for={name}>
        <h2>{name.replace("-", " ")}</h2>
      </label>
      {id === "ensamble-email" && (
        <p>
          Type in the email address of your ensamble OR leave the field empty if
          you wish to be contacted via your profile email.
        </p>
      )}
      <input
        name={name}
        id={name}
        type="text"
        required
        maxLength={max}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
