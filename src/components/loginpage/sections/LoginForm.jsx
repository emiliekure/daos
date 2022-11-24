import { useReducer } from "react";
import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import EmailField from "../../atoms/forms/EmailField";
import PasswordField from "../../atoms/forms/PasswordField";
import styles from "../../shared/Forms.module.css";

export default function LoginForm() {
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
  });

  const updateFormValue = (event) => {
    const { name, value } = event.target;
    dispatch({
      [name]: value,
    });
  };
  //Function to verify the email and password inputs
  const verifyInputs = () => {
    if (formValues.email === "" || formValues.password === "") {
      setValid(false);
      setError("");
    } else {
      setValid(true);
      /* // Then we call the backend and verify the user.
      		const resultFromServer = "Invalid Login";
      		setError(resultFromServer); */
    }
  };

  return (
    <section className={styles.formWrapper}>
      <h1>Log In</h1>
      <form className={styles.form}>
        <p>{error}</p>

        <EmailField value={formValues.email} onChange={updateFormValue} />

        <PasswordField
          type="password"
          value={formValues.password}
          onChange={updateFormValue}
        />

        <PrimaryButton type="button" onClick={verifyInputs} text="Submit" />

        {valid && <p>Login successful!</p>}
        {valid === false && <p>Login failed</p>}
      </form>
    </section>
  );
}
