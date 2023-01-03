import { isValidElement } from "react";
import styles from "./FormFields.module.css";

export default function ConfirmPasswordField({
  type,
  value,
  onChange,
  onBlur,
  isMatching,
}) {
  return (
    <div className={styles.fieldgroup}>
      <label htmlFor={type}>
        <h2>{type.replace("-", " ")}</h2>
      </label>
      <input
        name={type}
        id={type}
        type="password"
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ borderColor: !isMatching ? "red" : "" }}
      />
      {!isMatching && <p>Sorry the passwords dont match</p>}
    </div>
  );
}
