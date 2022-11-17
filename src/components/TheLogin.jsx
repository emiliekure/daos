import { useState } from "react";
import styles from "./TheLogin.module.css";

export default function TheLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");

  //Function to verify the email and password inputs
  const verifyInputs = () => {
    if (email === "" || password === "") {
      setValid(false);
      setError("");
    } else {
      setValid(true);
      /* // Then we call the backend and verify the user.
      const resultFromServer = "Invalid Login";
      setError(resultFromServer); */
    }
  };

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Log In</h1>
      <form className={styles.form}>
        <p>{error}</p>
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
        <button type="button" onClick={verifyInputs}>
          Submit
        </button>
        {valid && <p>Login sucessfull!</p>}
        {valid === false && <p>Login NOT sucessfull!</p>}
      </form>
    </div>
  );
}
