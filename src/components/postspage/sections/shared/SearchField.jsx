import styles from "./SearchField.module.css";

export default function SearchField({
  name,
  id,
  max,
  placeholder,
  value,
  onChange,
}) {
  console.log(placeholder);
  return (
    <div>
      <input
        name={name}
        id={id}
        type="text"
        maxLength={max}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
