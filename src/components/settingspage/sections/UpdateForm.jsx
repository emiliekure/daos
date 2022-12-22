import { useEffect, useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import ConfirmPasswordField from "../../atoms/forms/ConfirmPasswordField";
import EmailField from "../../atoms/forms/EmailField";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import PasswordField from "../../atoms/forms/PasswordField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function UpdateForm({ userProfile, getProfile, token }) {
  const [valid, setValid] = useState(undefined);
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confpassword, setConfPassword] = useState(userProfile.password);
  const [emailAvailable, setEmailAvailable] = useState("");
  const [isMatching, setIsmatching] = useState(true);

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    name: userProfile.name,
    surname: userProfile.surname,
    instrument: userProfile.instrument,
    email: userProfile.email,
    password: userProfile.password,
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
      updateProfile();
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

  function updateProfile() {
    fetch(`http://localhost:3004/profiles/updateProfile/${userProfile._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        getProfile();
      })
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

  function checkName() {
    if (formValues.name.length === 0) {
      setErrorName("Name cannot be empty");
      console.log(errorName);
    } else if (formValues.name.length === 1) {
      setErrorName("Name cannot be only 1 character!");
      console.log(errorName);
    } else {
      setErrorName("");
    }
  }

  function checkSurname() {
    if (formValues.surname.length === 0) {
      setErrorSurname("Surname cannot be empty");
      console.log(errorSurname);
    } else if (formValues.surname.length === 1) {
      setErrorSurname("Surname cannot be only 1 character!");
      console.log(errorSurname);
    } else {
      setErrorSurname("");
    }
  }

  function checkEmail() {
    if (formValues.email.length === 0) {
      setErrorEmail("Email cannot be empty");
      console.log(errorEmail);
    } else {
      if (formValues.email.includes("@")) {
        setErrorEmail("");
        fetch("http://localhost:3004/profiles/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: `{"email": ${JSON.stringify(formValues.email)} }`,
        })
          .then((response) => response.json())
          .then((response) => setEmailAvailable(response.message))
          .catch((err) => console.error(err));
      } else {
        setErrorEmail("The email must include an '@' sign");
        console.log(error);
      }
    }
  }

  function validatePassword() {
    if (formValues.password.length === 0) {
      setErrorPassword("Password cannot be empty!");
      console.log(errorPassword);
    } else if (formValues.password.length < 8) {
      setErrorPassword("Password must be at least 8 characters!");
      console.log(errorPassword);
    } else {
      setErrorPassword("");
    }
  }

  return (
    <section className={styles.formWrapper}>
      <h1>Update profile settings</h1>
      <form className={styles.form}>
        <TextField
          name="name"
          placeholder=""
          value={formValues.name}
          onChange={updateFormValue}
          onBlur={checkName}
          errorName={errorName}
        />

        <TextField
          name="surname"
          placeholder=""
          value={formValues.surname}
          onChange={updateFormValue}
          onBlur={checkSurname}
          errorSurname={errorSurname}
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
          emailAvailable={emailAvailable}
          errorEmail={errorEmail}
        />

        <PasswordField
          type="password"
          value={formValues.password}
          onChange={updateFormValue}
          onBlur={validatePassword}
          errorPassword={errorPassword}
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
