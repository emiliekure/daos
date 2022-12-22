import { useReducer } from "react";
import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import EmailField from "../../atoms/forms/EmailField";
import PasswordField from "../../atoms/forms/PasswordField";
import styles from "../../shared/Forms.module.css";

export default function LoginForm() {
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [emailAvailable, setEmailAvailable] = useState("");

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
      loginUser();
    }
  };

  function checkEmail() {
    setEmailAvailable("");
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

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  };

  function loginUser() {
    fetch("http://localhost:3004/auth/login", options)
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          ["email"]: "",
          ["password"]: "",
        });
        localStorage.clear();
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setTimeout(() => localStorage.clear(), 3600000);
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
        checkEmail();
        validatePassword();
      });
  }

  return (
    <section className={styles.formWrapper}>
      <h1>Log In</h1>
      <form className={styles.form}>
        <p>{error}</p>

        <EmailField
          value={formValues.email}
          onChange={updateFormValue}
          onBlur={checkEmail}
          emailExists={emailAvailable}
          errorEmail={errorEmail}
        />

        <PasswordField
          type="password"
          value={formValues.password}
          onChange={updateFormValue}
          onBlur={validatePassword}
          errorPassword={errorPassword}
        />

        <PrimaryButton
          type="button"
          onClick={verifyInputs}
          text="Submit"
          errorEmail={errorEmail}
        />

        {valid && <p>Login successful!</p>}
        {valid === false && <p>Login failed</p>}
      </form>
    </section>
  );
}
