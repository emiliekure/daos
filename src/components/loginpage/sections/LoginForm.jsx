import { useReducer } from "react";
import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import EmailField from "../../atoms/forms/EmailField";
import PasswordField from "../../atoms/forms/PasswordField";
import styles from "../../shared/Forms.module.css";
import UnauthorisedModal from "../../atoms/posts/UnauthorisedModal";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
  },
};

export default function LoginForm({ isLoggedIn, setIsLoggedIn }) {
  const [valid, setValid] = useState(undefined);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [emailAvailable, setEmailAvailable] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
  const verifyInputs = (event) => {
    event.preventDefault();
    if (formValues.email === "" || formValues.password === "") {
      setValid(false);
      setErrorMsg(
        `All fields marked with a '*' have to be filled out before submitting!`
      );
    } else {
      setValid(true);
      setErrorMsg("");
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
        console.log(response);
        if (response.statusCode === 401) {
          setErrorMsg(
            "Ops! Something went wrong. Please try to log in again with the correct email and password."
          );
          setIsOpen(true);
        } else {
          dispatch({
            ["email"]: "",
            ["password"]: "",
          });
          localStorage.clear();
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("user", JSON.stringify(response.user));
          setTimeout(() => localStorage.clear(), 3600000);
          setIsLoggedIn(true);
          setErrorMsg("You are now successfully logged in!");
          setIsOpen(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <section onSubmit={verifyInputs} className={styles.formWrapper}>
      <h1>Log In</h1>
      <form className={styles.form}>
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
          type="submit"
          id="submit"
          text="Submit"
          errorEmail={errorEmail}
        />

        {!valid && <p>{errorMsg}</p>}
      </form>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        <UnauthorisedModal
          style={styles}
          onClick={() => setIsOpen(false)}
          errorMsg={errorMsg}
          isLoggedIn={isLoggedIn}
          title="Welcome!"
        ></UnauthorisedModal>
      </Modal>
    </section>
  );
}
