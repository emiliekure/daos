import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import ConfirmPasswordField from "../../atoms/forms/ConfirmPasswordField";
import EmailField from "../../atoms/forms/EmailField";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import PasswordField from "../../atoms/forms/PasswordField";
import TextField from "../../atoms/forms/TextField";
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

export default function SignupForm({ isLoggedIn }) {
  const [valid, setValid] = useState(undefined);
  const [errorName, setErrorName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [emailAvailable, setEmailAvailable] = useState("");
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
  const verifyInputs = (event) => {
    event.preventDefault();
    if (
      formValues.name === "" ||
      formValues.surname === "" ||
      formValues.instrument === "" ||
      formValues.email === "" ||
      formValues.password === "" ||
      confpassword === ""
    ) {
      setValid(false);
      setErrorMsg(
        `All fields marked with a '*' have to be filled before submitting!`
      );
    } else {
      setValid(true);
      setErrorMsg("");
      const signupProfile = { ...formValues };
      signupProfile.dateOfCreation = new Date();
      createProfile(signupProfile);
    }
  };

  function createProfile(signupProfile) {
    fetch("http://localhost:3004/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupProfile),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        dispatch({
          ["name"]: "",
          ["surname"]: "",
          ["instrument"]: "",
          ["email"]: "",
          ["password"]: "",
        });
        setConfPassword("");
        setErrorMsg(
          "Your profile has been successfully created! Please proceed to log into your new account."
        );
        setIsOpen(true);
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
    setErrorName("");
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
    setErrorSurname("");
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
    setEmailAvailable("");
    setErrorEmail("");
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
      }
    }
  }

  function validatePassword() {
    setErrorPassword("");
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
      <h1>Sign Up</h1>
      <form className={styles.form} onSubmit={verifyInputs}>
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
          availableMsg={emailAvailable}
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

        <PrimaryButton id="submit" type="submit" text="Submit" />
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
          title="Welcome to the DAOS platform!"
        ></UnauthorisedModal>
      </Modal>
    </section>
  );
}
