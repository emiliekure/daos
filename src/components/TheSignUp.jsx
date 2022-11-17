import { useState } from "react";
import styles from "./TheSignUp.module.css";

export default function TheForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [field, setField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");

  //Function to verify the inputs
  const verifyInputs = () => {
    if (
      fname === "" ||
      lname === "" ||
      field === "" ||
      email === "" ||
      password === "" ||
      confpassword === ""
    ) {
      setValid(false);
      setError("");
    } else {
      setValid(true);
    }
  };

  const updateFname = (event) => {
    setFname(event.target.value);
  };
  const updateLname = (event) => {
    setLname(event.target.value);
  };
  const updateField = (event) => {
    setField(event.target.value);
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const updateConfPassword = (event) => {
    setConfPassword(event.target.value);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Sign Up</h1>
      <form className={styles.form}>
        <label for="first-name">First name</label>
        <input
          name="first-name"
          id="first-name"
          type="text"
          required
          value={fname}
          onChange={updateFname}
        />

        <label for="last-name">Last name</label>
        <input
          name="last-name"
          id="last-name"
          type="text"
          required
          value={lname}
          onChange={updateLname}
        />
        <label for="field" required>
          Your field
        </label>
        <select id="field" name="field" value={field} onChange={updateField}>
          <option disabled selected>
            Please choose your expertise
          </option>
          <option value="None">None</option>
          <option value="Dirigent">Dirigent</option>
          <option value="Natural Horn">Natural Horn</option>
          <option value="Natural Trumpet">Natural Trumpet</option>
          <option value="Sackbut">Sackbut</option>
          <option value="Serpent">Serpent</option>
          <option value="Slide Trumpet">Slide Trumpet</option>
          <option value="Theorbo">Theorbo</option>
          <option value="Trumpet">Trumpet</option>
          <option value="Vihuela">Vihuela</option>
          <option value="Viol">Viol</option>
          <option value="Viola">Viola</option>
          <option value="Violin">Violin</option>
          <option value="Violone">Violone</option>
        </select>
        <label for="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          required
          value={email}
          onChange={updateEmail}
        />

        <label for="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          required
          value={password}
          onChange={updatePassword}
        />

        <label for="confirm-password">Cofirm password</label>
        <input
          name="confirm-password"
          id="confirm-password"
          type="password"
          required
          value={confpassword}
          onChange={updateConfPassword}
        />
        <button type="button" onClick={verifyInputs}>
          Submit
        </button>
        {valid && <p>Sign Up sucessfull!</p>}
        {valid === false && <p>Sign Up NOT sucessfull!</p>}
      </form>
    </div>
  );
}
