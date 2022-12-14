import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function EnsambleForm() {
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");
  const [ensambleNameError, setEnsambleNameError] = useState("");
  const [ensambleEmailError, setEnsambleEmailError] = useState("");
  const [ensambleCapacityError, setEnsambleCapacityError] = useState("");
  const [ensambleDescriptionError, setEnsambleDescriptionError] = useState("");
  const [nameAvailable, setNameAvailable] = useState("");

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    name: "",
    capacity: "",
    description: "",
    location: "",
    email: "",
  });

  const updateFormValue = (event) => {
    const { name, value } = event.target;
    dispatch({
      [name]: value,
    });
  };

  // Function to verify the inputs
  const verifyInputs = () => {
    if (
      formValues.name === "" ||
      formValues.capacity === "" ||
      formValues.description === "" ||
      formValues.location === ""
    ) {
      setValid(false);
      setError("");
    } else {
      setValid(true);
      const author = JSON.parse(localStorage.getItem("user"));
      const createdEnsamble = { ...formValues };
      createdEnsamble.creator = author._id;
      if (createdEnsamble.email.length === 0) {
        createdEnsamble.email = author.email;
      }
      console.log(createdEnsamble);
      const token = localStorage.getItem("token");
      createEnsamble(createdEnsamble, token);
      dispatch({
        ["name"]: "",
        ["capacity"]: "",
        ["description"]: "",
        ["location"]: "",
        ["email"]: "",
      });
    }
  };

  function createEnsamble(ensamble, token) {
    if (token && token !== "") {
      fetch("http://localhost:3004/ensambles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ensamble),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } else {
      console.log("Error - unauthorized");
    }
  }

  function checkEnsambleName() {
    if (formValues.name.length === 0) {
      setEnsambleNameError("The ensamble name cannot be empty");
    } else {
      fetch("http://localhost:3004/ensambles/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"name": ${JSON.stringify(formValues.name)} }`,
      })
        .then((response) => response.json())
        .then((response) => setNameAvailable(response.message))
        .catch((err) => console.error(err));
    }
  }

  function checkEnsambleEmail() {
    /* if (formValues.email.length === 0) {
      setEnsambleEmailError("Email cannot be empty");
      console.log(ensambleEmailError);
    } else { */
    if (formValues.email.length !== 0) {
      if (formValues.email.includes("@")) {
        setEnsambleEmailError("");
      } else {
        setEnsambleEmailError("The email must include an '@' sign");
        console.log(error);
      }
    }
  }

  function checkEnsambleCapacity() {
    console.log(Number(formValues.capacity));
    if (formValues.capacity.length === 0) {
      setEnsambleCapacityError("Capacity cannot be empty");
    } else if (formValues.capacity === "0") {
      setEnsambleCapacityError("Capacity cannot be 0");
    } else {
      if (formValues.capacity.length < 3 && Number(formValues.capacity)) {
        setEnsambleCapacityError("");
      } else {
        setEnsambleCapacityError(
          "Capacity has to be expressed in max of 2 numbers (max capacity is 100 members)"
        );
      }
    }
  }

  function checkEnsambleDescription() {
    if (formValues.description.length === 0) {
      setEnsambleDescriptionError("Description cannot be empty");
    } else if (
      formValues.description.length < 5 ||
      formValues.description.length > 20
    ) {
      setEnsambleDescriptionError(
        "Description has to be min 5 characters and max 120 characters!"
      );
    } else {
      setEnsambleDescriptionError("");
    }
  }

  return (
    <section className={styles.formWrapper}>
      <h1>Create an ensamble</h1>
      <form className={styles.form}>
        <TextField
          name="name"
          id="name"
          max="120"
          placeholder=""
          value={formValues.name}
          onChange={updateFormValue}
          nameAvailable={nameAvailable}
          ensambleNameError={ensambleNameError}
          onBlur={checkEnsambleName}
        />

        <TextField
          name="email"
          max=""
          id="ensamble-email"
          value={formValues.email}
          onChange={updateFormValue}
          onBlur={checkEnsambleEmail}
          ensambleEmailError={ensambleEmailError}
        />

        <TextField
          name="capacity"
          max=""
          value={formValues.capacity}
          onChange={updateFormValue}
          onBlur={checkEnsambleCapacity}
          ensambleCapacityError={ensambleCapacityError}
        />

        <TextField
          name="location"
          value={formValues.location}
          onChange={updateFormValue}
        />

        <TextareaField
          name="description"
          id="description"
          value={formValues.description}
          onChange={updateFormValue}
          onBlur={checkEnsambleDescription}
          ensambleDescriptionError={ensambleDescriptionError}
        />

        <PrimaryButton type="button" onClick={verifyInputs} text="Submit" />
        {valid && <p>Ensamble created successfully!</p>}
        {valid === false && <p>Ensamble creation failed</p>}
      </form>
    </section>
  );
}
