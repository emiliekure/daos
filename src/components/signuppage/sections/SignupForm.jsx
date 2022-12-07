import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import ConfirmPasswordField from "../../atoms/forms/ConfirmPasswordField";
import EmailField from "../../atoms/forms/EmailField";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import PasswordField from "../../atoms/forms/PasswordField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function SignupForm() {
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [availableMsg, setAvailableMsg] = useState("");
  const [isMatching, setIsmatching] = useState(true);

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    name: "",
    surname: "",
    instrument: "",
    email: "",
    password: "",
  });

  const updateFormValue = (event) => {
    const { name, value } = event.target;
    dispatch({
      [name]: value,
    });
  };

  //Function to verify the inputs
  const verifyInputs = () => {
    if (
      formValues.name === "" ||
      formValues.surname === "" ||
      formValues.instrument === "" ||
      formValues.email === "" ||
      formValues.password === "" ||
      confpassword === ""
    ) {
      setValid(false);
      setError("");
    } else {
      setValid(true);
      createProfile();
      dispatch({
        ["name"]: "",
        ["surname"]: "",
        ["instrument"]: "",
        ["email"]: "",
        ["password"]: "",
      });
      setConfPassword("");
    }
  };

  function createProfile() {
    fetch("http://localhost:3004/profiles/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  const updateConfPassword = (event) => {
    setConfPassword(event.target.value);
  };

  const checkPasswords = () => {
    if (formValues.password === confpassword) {
      setIsmatching(true);
    } else {
      setIsmatching(false);
    }
  };

  function checkEmail() {
    fetch("http://localhost:3004/profiles/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"email": ${JSON.stringify(formValues.email)} }`,
    })
      .then((response) => response.json())
      .then((response) => setAvailableMsg(JSON.stringify(response.message)))
      .catch((err) => console.error(err));
  }

  return (
    <section className={styles.formWrapper}>
      <h1>Sign Up</h1>
      <form className={styles.form}>
        <TextField
          name="name"
          max=""
          placeholder=""
          value={formValues.name}
          onChange={updateFormValue}
        />

        <TextField
          name="surname"
          max=""
          placeholder=""
          value={formValues.surname}
          onChange={updateFormValue}
        />

        <InstrumentSelect
          name="instrument"
          value={formValues.instrument}
          onChange={updateFormValue}
        />

        <EmailField
          value={formValues.email}
          onChange={updateFormValue}
          onBlur={checkEmail}
        />

        <PasswordField
          type="password"
          value={formValues.password}
          onChange={updateFormValue}
        />

        <ConfirmPasswordField
          type="confirm-password"
          value={confpassword}
          onChange={updateConfPassword}
          onBlur={checkPasswords}
          isMatching={isMatching}
        />

        <PrimaryButton type="button" onClick={verifyInputs} text="Submit" />
        {valid && <p>Sign up successful!</p>}
        {valid === false && <p>Sign up failed</p>}
      </form>
    </section>
  );
}
