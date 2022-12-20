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
    <div style={styles}>
      <input
        name={name}
        id={id}
        type="text"
        maxLength={max}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
